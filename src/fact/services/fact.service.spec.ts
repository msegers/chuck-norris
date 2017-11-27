import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed, inject} from "@angular/core/testing";
import {FactService} from "./fact.service";
import {Fact} from "../models/fact";
import {FactHttpResponse} from "../models/factHttpResponse";


describe("FactService", () => {
    let factService: FactService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FactService],
        });
        httpMock = TestBed.get(HttpTestingController);
        factService =  TestBed.get(FactService);
    });

    // TODO: Something is going wrong with this test get some help online
    it("Should be able to retrieve Facts in subscription when calling loadFacts", (done) => {
        const factList: Fact[] = [
            {id: 1, joke: "a"},
            {id: 2, joke: "a"},
        ];

        const factResponse: FactHttpResponse = { value: factList};

        factService.subscribe(val => {
            expect(val).toEqual(factList);
            done();
        });

        const mockRequest = httpMock
            .expectOne(factService.CHUCK_NORRIS_API.replace("{count}", "10"));
        expect(mockRequest.request.method).toEqual('GET');

        factService.loadFacts();

        mockRequest.flush(factResponse);
    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
    }));
});
