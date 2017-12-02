import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/observable/interval"; // without unit test fails
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";

import { NotificationService } from "../../common/services/notification.service";
import { Fact } from "../models/fact";
import { FactHttpResponse } from "../models/factHttpResponse";

@Injectable()
export class FactService  {

    public static readonly CHUCK_NORRIS_API = "http://api.icndb.com/jokes/random/{count}";
    public static readonly RANDOM = "random";
    public static readonly FAVORITE = "favorite";
    private static readonly FAVORITES_STORAGE_KEY = "CN.Favorites";

    private factSubject = new Subject();
    private favoriteSubject = new Subject();
    private facts: Fact[] = [];
    private favorites: Fact[] = [];
    private loadRandomObservable: Subscription = null;

    constructor(
        private http: HttpClient,
        private notificationService: NotificationService,
    ) {
        this.retrieveFavorites();
        this.favoriteSubject.next(this.favorites);
    }

    public subscribe(type: string, callback: (value: Fact[]) => void): Subscription {
        if (type === FactService.RANDOM) {
            if (this.facts.length) {
                callback(this.facts);
            }
            return this.factSubject.subscribe(callback);
        } else if (type === FactService.FAVORITE) {
            if (this.favorites.length) {
                callback(this.favorites);
            }
            return this.favoriteSubject.subscribe(callback);
        }
    }

    public loadFacts(count = 10) {
        this.http.get<FactHttpResponse>(FactService.CHUCK_NORRIS_API.replace("{count}", count.toString()))
            .subscribe(data => {
               if (data.value) {
                   this.facts = data.value
                       .map(f => {
                           f.favorite = !!this.favorites.find(fav => fav.id === f.id);
                           return f;
                       });
                   this.factSubject.next(this.facts);
               }
            });
    }

    public toggleFavorite(fact: Fact) {
        fact.favorite = !fact.favorite;

        let factIndex = this.facts.findIndex(f => fact.id === f.id);
        if (factIndex !== -1) {
            this.facts[factIndex].favorite = fact.favorite;
        }

        factIndex = this.favorites.findIndex(f => fact.id === f.id);
        if (factIndex !== -1) {
            this.favorites.splice(factIndex, 1);
        } else if (this.favorites.length < 10) {
            this.favorites.push(fact);
        } else {
            this.favorites.length = 10;
            fact.favorite = false;
            this.toggleRandomFavorites(false);
            this.notificationService.notify("Maximum number of Favorites reached (10).");
        }

        this.persistFavorites();
        this.factSubject.next(this.facts);
        this.favoriteSubject.next(this.favorites);
    }

    public toggleRandomFavorites(enable: boolean = null) {
        if (this.loadRandomObservable == null && enable !== false) {
            this.initRandomObservable();
        } else if (this.loadRandomObservable) {
            this.loadRandomObservable.unsubscribe();
            this.loadRandomObservable = null;
        }
    }

    public initRandomObservable(): void {
        this.loadRandomObservable = Observable.interval(5000)
            .subscribe(() => {
                this.http.get(FactService.CHUCK_NORRIS_API.replace("{count}", "1"))
                    .subscribe((data: FactHttpResponse) => {
                        const fact = data.value[0];
                        // make sure we don't un-favorite a fact
                        if (!this.favorites.find(f => f.id === fact.id)) {
                            this.toggleFavorite(fact);
                        }
                    });
            });
    }

    public isRandomLoadingActive(): boolean {
        return !!this.loadRandomObservable;
    }

    private persistFavorites() {
        localStorage.setItem(FactService.FAVORITES_STORAGE_KEY, JSON.stringify(this.favorites));
    }

    private retrieveFavorites() {
        const favoriteStorage = localStorage.getItem(FactService.FAVORITES_STORAGE_KEY);
        if (favoriteStorage) {
            this.favorites = JSON.parse(favoriteStorage);
        }
    }
}
