import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators'
interface user {

    kullanici: string,
    id: string

}

@Injectable()
export class UserService {
    private user: user
    public  pid:string="cAjqc3aSNgH2IHJaX6Kz";
    
    


    constructor(private afAuth: AngularFireAuth) { }

getpId(){
return this.pid

}
    setUser(user: user) {
        this.user = user
    }

    async isAuthenticated() {
        if (this.user) {

            return true
        }
        const user = await this.afAuth.authState.pipe(first()).toPromise()
        if (user) {
            this.setUser({
                kullanici: user.email,
                id: user.uid
            })
            return true
        }
        return false
    }
    getUID() {

        if (!this.user) {
            if (this.afAuth.auth.currentUser) {
                const user = this.afAuth.auth.currentUser
                this.setUser({
                    kullanici: user.email,
                    id: user.uid
                })
                return user.uid
            }
            else {
                throw new Error("Kullanıcı Giriş Yapamadı")
            }
        }
        else {
            return this.user.id
        }
    }

}