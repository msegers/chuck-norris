import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import {Fact} from "../models/fact";
import {FactHttpResponse} from "../models/factHttpResponse";

@Injectable()
export class FactService {

    // public for testing purposes
    public static readonly CHUCK_NORRIS_API = "http://api.icndb.com/jokes/random/{count}";
    public static readonly RANDOM = "random";
    public static readonly FAVORITE = "favorite";
    private static readonly FAVORITES_STORAGE_KEY = "CN.Favorites";

    private factSubject = new Subject();
    private favoriteSubject = new Subject();
    private facts: Fact[] = [];
    private favorites: Fact[] = [];

    constructor(private http: HttpClient) {
        this.retrieveFavorites();
        this.favoriteSubject.next(this.favorites);
    }

    public subscribe(type: string, callback: (value: Fact[]) => void) {
        if (type === FactService.RANDOM) {
            return this.factSubject.subscribe(callback);
        } else if (type === FactService.FAVORITE) {
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
        } else {
            this.favorites.push(fact);
        }

        this.persistFavorites();
        this.factSubject.next(this.facts);
        this.favoriteSubject.next(this.favorites);
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
