import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User, Role, NewPost } from '../_models';
 
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const users: User[] = [
                        {email:'guest@guest.com', password: 'password', role: Role.User},
                        {email:'admin@admin.com', password: 'password', role: Role.Admin}
                    ];
        let news: NewPost[];
        if( localStorage.getItem('news') ) {
            news = JSON.parse(localStorage.getItem('news'));
        }
        else {
            news = [
                {id: 1, title: 'تفسير حدائق الروح والريحان في روابي علوم القرآن', details: 'كلامي موجه؛ لمن  قل عنده الوعي  والورع، لمن قل عنده تدين كان  يدعيه، ولبس ثوب المفتي داخل  أسرته، وحرّم كل شيء فجزاه الله خيراً، ولكنه نسي ما هو أعظم يصدق...', image: 'news1.png', author: 'محمد نبيل', date: '2019-01-26', category: 'عالم  إسلامي', views:25456},
                {id: 2, title: 'تفسير حدائق الروح والريحان في روابي علوم القرآن', details: 'كلامي موجه؛ لمن  قل عنده الوعي  والورع، لمن قل عنده تدين كان  يدعيه، ولبس ثوب المفتي داخل  أسرته، وحرّم كل شيء فجزاه الله خيراً، ولكنه نسي ما هو أعظم يصدق...', image: 'news2.png', author: 'محمد نبيل', date: '2019-01-26', category: 'عالم  إسلامي', views:25456},
                {id: 3, title: 'تفسير حدائق الروح والريحان في روابي علوم القرآن', details: 'كلامي موجه؛ لمن  قل عنده الوعي  والورع، لمن قل عنده تدين كان  يدعيه، ولبس ثوب المفتي داخل  أسرته، وحرّم كل شيء فجزاه الله خيراً، ولكنه نسي ما هو أعظم يصدق...', image: 'news3.png', author: 'محمد نبيل', date: '2019-01-26', category: 'عالم  إسلامي', views:25456},
                {id: 4, title: 'تفسير حدائق الروح والريحان في روابي علوم القرآن', details: 'كلامي موجه؛ لمن  قل عنده الوعي  والورع، لمن قل عنده تدين كان  يدعيه، ولبس ثوب المفتي داخل  أسرته، وحرّم كل شيء فجزاه الله خيراً، ولكنه نسي ما هو أعظم يصدق...', image: 'news1.png', author: 'محمد نبيل', date: '2019-01-26', category: 'عالم  إسلامي', views:25456},
                {id: 5, title: 'تفسير حدائق الروح والريحان في روابي علوم القرآن', details: 'كلامي موجه؛ لمن  قل عنده الوعي  والورع، لمن قل عنده تدين كان  يدعيه، ولبس ثوب المفتي داخل  أسرته، وحرّم كل شيء فجزاه الله خيراً، ولكنه نسي ما هو أعظم يصدق...', image: 'news2.png', author: 'محمد نبيل', date: '2019-01-26', category: 'عالم  إسلامي', views:25456},
                {id: 6, title: 'تفسير حدائق الروح والريحان في روابي علوم القرآن', details: 'كلامي موجه؛ لمن  قل عنده الوعي  والورع، لمن قل عنده تدين كان  يدعيه، ولبس ثوب المفتي داخل  أسرته، وحرّم كل شيء فجزاه الله خيراً، ولكنه نسي ما هو أعظم يصدق...', image: 'news3.png', author: 'محمد نبيل', date: '2019-01-26', category: 'عالم  إسلامي', views:25456}
            ];
            localStorage.setItem('news', JSON.stringify(news));
        }
        
        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[roleString] : null;

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            
            if (request.url.endsWith('/users/login') && request.method === 'POST') {
                const user = users.find(x => x.email === request.body.email && x.password === request.body.password);
                if (!user) return error('Email or password is incorrect');
                return ok({
                    role: user.role,
                    token: `fake-jwt-token.${user.role}`
                });
            }
   
               // get all users
               if (request.url.endsWith('/news') && request.method === 'GET') {
                   if (!isLoggedIn) return unauthorized();
                   return ok(news);
               }
               if (request.url.endsWith('/latestnews') && request.method === 'GET') {
                   if (!isLoggedIn) return unauthorized();
                   return ok(news);
               }
               if (request.url.endsWith('/popularnews') && request.method === 'GET') {
                   if (!isLoggedIn) return unauthorized();
                   return ok(news);
               }
               if (request.url.match(/\/news\/\d+$/) && request.method === 'DELETE') {
                   if (role !== Role.Admin) return unauthorized();
                   
                   let urlParts = request.url.split('/');
                   let id = parseInt(urlParts[urlParts.length - 1]);
                   console.log(id);
                   // let index = news.indexOf(id)
                   news = news.filter( n => n.id !== id);
                   
                   localStorage.setItem('news', JSON.stringify(news));
                   
                   return ok(news);
               }
               if (request.url.match(/\/news\/\d+$/) && request.method === 'PUT') {
                   if (role !== Role.Admin) return unauthorized();
                   
                   let urlParts = request.url.split('/');
                   let id = parseInt(urlParts[urlParts.length - 1]);
                   let newPost = request.body;
                   let itemIndex = news.findIndex(item => item.id == id);
                   news[itemIndex] = newPost;
                   
                   localStorage.setItem('news', JSON.stringify(news));
                   
                   return ok(news);
               }
               
               if (request.url.endsWith('/news') && request.method === 'POST') {
                   if (role !== Role.Admin) return unauthorized();
                   
                   let newPost = request.body;
                   news.push(newPost);
                   
                   localStorage.setItem('news', JSON.stringify(news));
                   
                   return ok(news);
               }
   
               // pass through any requests not handled above
               return next.handle(request);
           }))
           // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
           .pipe(materialize())
           .pipe(delay(500))
           .pipe(dematerialize());


        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ error: { message } });
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
