import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CommonService {

    messageSource = new BehaviorSubject<string>('Default message from common service');
    //currentMessage = this.messageSource.asObservable();

    constructor(private http: Http) { }

    getDataList():Observable<Response> {
        return this.http
            .get("http://localhost:3000/employees")
            .map(resp => resp.json());

        /*return this.httpService
            .get("parcel")
            .map((resp: Response) => resp.json());*/
    }

    changeMessage(message: string){
        this.messageSource.next(message);
    }
}
