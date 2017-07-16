import {Injectable} from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
}   from '@angular/router';


import {claimNames} from '../core/claim-names.constants';
import {IdentityService} from '../core/identity.service';
import {LoggerService} from '../core/logger.service';

@Injectable()
export class CustomerRoutingGuardService implements CanActivate {
    constructor(private identityService: IdentityService, private router:Router) {
        console.log('Constructing customer routing guard');
    }

    canActivate(): boolean {
        // Determine if this route-guard has any matching customerClaimValues in the 
        // list of claimValues for this appType

        let claim = this.identityService.hasClaimSequence(claimNames.appType.customerClaimValues, claimNames.appType.name);

        if(claim && this.identityService.isAuthorized()){
            return true
        }else {
            this.router.navigate(['customer/login']);
        }
    }
}

@Injectable()
export class ParcelListRoutingGuardService implements CanActivate
{
    constructor(private identityService: IdentityService, private router:Router)
    {
        console.log('Constructing admin routing guard');
    }

    canActivate(): boolean {

        if(this.identityService.isAuthorized()){
            return true;
        }else {
            this.router.navigate(['customer/login']);
        }
    }
}