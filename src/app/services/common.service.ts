import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CommonService {

    //private dataUrl = 'app/api/data.json';
    private dataUrl = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private http: Http) { }

    getDataList():Observable<Response> {
        return this.http
            .get(this.dataUrl)
            .map(resp => resp.json());

        /*return this.httpService
            .get("parcel")
            .map((resp: Response) => resp.json());*/
    }
}
