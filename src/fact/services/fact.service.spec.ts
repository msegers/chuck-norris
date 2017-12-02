import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TestBed } from "@angular/core/testing";

import { FactService } from "./fact.service";
import { Fact} from "../models/fact";
import { FactHttpResponse } from "../models/factHttpResponse";
import { CommonModule } from "../../common/common.module";
import { NotificationService } from "../../common/services/notification.service";



describe("FactService", () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
        localStorage.clear();
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                CommonModule,
                NoopAnimationsModule,
            ],
            providers: [
                FactService,
                NotificationService
            ],
        });
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it("Should be able to retrieve Facts in subscription when calling loadFacts", done => {
        let factService =  TestBed.get(FactService);

        const factList: Fact[] = [{id: 1, joke: "a"}, {id: 2, joke: "a"}];
        const factResponse: FactHttpResponse = { value: factList};

        factService.subscribe(FactService.RANDOM, (val: Fact[]) => {
            expect(val).toEqual(factList);
            done();
        });
        factService.loadFacts();

        const mockRequest = httpMock
            .expectOne(FactService.CHUCK_NORRIS_API.replace("{count}", "10"));
        expect(mockRequest.request.method).toEqual('GET');

        mockRequest.flush(factResponse);

        httpMock.verify();
    });

    it("Should emit both favorites and random facts when editing favorites", done => {
        let doneCounter = 0;
        let factService =  TestBed.get(FactService);

        factService.subscribe(FactService.RANDOM, (val: Fact[]) => {
            expect(val.length).toBe(0);
            doneCounter ++;
            if (doneCounter > 1) {
                done();
            }
        });
        factService.subscribe(FactService.FAVORITE, (val: Fact[]) => {
            expect(val.length).toBe(1);
            expect(val[0].favorite).toBe(true);
            doneCounter ++;
            if (doneCounter > 1) {
                done();
            }
        });

        factService.toggleFavorite({id: 1, joke: "hello world"});

    });

    it("Should return fact marked as favorite with .favorite = true in both emit calls", done => {
        const factService =  TestBed.get(FactService);
        const factList: Fact[] = [{id: 1, joke: "a", favorite: false}, {id: 2, joke: "a", favorite: false}];
        const factResponse: FactHttpResponse = { value: factList};
        let doneCounter = 0;

        factService.loadFacts();

        // We don't have a different way of populating service data, so we call the mock httpService
        const mockRequest = httpMock
            .expectOne(FactService.CHUCK_NORRIS_API.replace("{count}", "10"));

        mockRequest.flush(factResponse);

        factService.subscribe(FactService.FAVORITE, (val: Fact[]) => {
            expect(val.find(f => f.id === 1).favorite).toBe(true);
            doneCounter ++;
            if (doneCounter > 1) {
                done();
            }
        });

        // Wanted to use 1, but TestBed's state is not being reset (It should be actually)
        factService.toggleFavorite({id: 1, joke: "a", favorite: false});

        factService.subscribe(FactService.RANDOM, (val: Fact[]) => {
            expect(val.find(f => f.id === 1).favorite).toBe(true);
            doneCounter ++;
            if (doneCounter > 1) {
                done();
            }
        });
    });

    it("Should be impossible to set more than 10 favorites", done => {
        const factService =  TestBed.get(FactService);
        let doneCounter = 0;
        factService.subscribe(FactService.FAVORITE, (val: Fact[]) => {
            expect(val.length).toBeLessThan(11);
            doneCounter++;
            if (doneCounter > 10) {
                done();
            }
        });

        for(let i = 0; i < 11; i++) {
            factService.toggleFavorite({id: i, joke: "a", favorite: false});
        }
    });

    it("Should contain a method to trace if random-loading is toggled", () => {
        const factService =  TestBed.get(FactService);
        expect(factService.isRandomLoadingActive()).toBe(false);
        factService.toggleRandomFavorites();
        expect(factService.isRandomLoadingActive()).toBe( true);
    });

    it("Should send a notification when attemption to add 11th favorite is made", () => {
        const factService =  TestBed.get(FactService);
        const notificationService = TestBed.get(NotificationService);

        spyOn(notificationService, "notify").and.callFake(() => {});

        for(let i = 0; i < 11; i++) {
            factService.toggleFavorite({id: i, joke: "a", favorite: false});
        }

        expect(notificationService.notify).toHaveBeenCalledTimes(1);
    });

    it ("Should load a random favorite every 5 seconds when enabled", done => {
        const factService = TestBed.get(FactService);
        const setUpMockRequest = (id: number) => {
            const mockRequest = httpMock.expectOne(FactService.CHUCK_NORRIS_API.replace("{count}", "1"));
            expect(mockRequest.request.method).toEqual('GET');
            mockRequest.flush({ value: [{id: id, joke: "something"}]});
        };

        let timeStampStart = new Date().getTime();
        let emitCounter = 0;

        factService.toggleRandomFavorites();
        // timeout because the url request should be in already
        setTimeout(() => { setUpMockRequest(1); }, 5000);

        const subscription = factService.subscribe(FactService.FAVORITE, (favorites: Fact[]) => {
            emitCounter ++;
            console.log("emitCounter", emitCounter); // This prevents chrome from closing after 10 sec
            expect(favorites.length).toBe(emitCounter);
            if (emitCounter == 2) {
                expect(new Date().getTime() - timeStampStart).toBeGreaterThan(10000);
                done();
                subscription.unsubscribe();
            } else {
                // timeout because the url request should be in already
                setTimeout(() => { setUpMockRequest(emitCounter + 1); }, 5000);
            }
        });
    }, 11000);
});
