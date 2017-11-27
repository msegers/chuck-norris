import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import {Fact} from "../models/fact";
import {FactHttpResponse} from "../models/factHttpResponse";

@Injectable()
export class FactService {

    // public for testing purposes
    public readonly CHUCK_NORRIS_API = "http://api.icndb.com/jokes/random/{count}";
    private factSubject = new Subject();
    private facts: Fact[] = [];
    private favorites: Fact[] = [];

    constructor(private http: HttpClient) { }

    public subscribe(callback: (value: Fact[]) => void) {
        return this.factSubject.subscribe(callback);
    }

    public loadFacts(count = 10) {
        this.http.get<FactHttpResponse>(this.CHUCK_NORRIS_API.replace("{count}", count.toString()))
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
}
