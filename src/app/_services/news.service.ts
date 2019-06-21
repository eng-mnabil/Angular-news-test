import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NewPost } from '../_models';

@Injectable({ providedIn: 'root' })
export class NewsService {
    constructor(
        private http: HttpClient
    ) {}
    
    getAll() {
        return this.http.get(`apiURLhere/news`);
    }
    
    getLatestNews() {
        return this.http.get(`apiURLhere/latestnews`);
    }
    
    getPopularNews() {
        return this.http.get(`apiURLhere/popularnews`);
    }
    
    create(newPost: NewPost) {
        return this.http.post(`apiURLhere/news`, newPost);
    }
    
    update(newPost: NewPost) {
        return this.http.put(`apiURLhere/news/`+newPost.id, newPost);
    }
    
    delete(id: number) {
        return this.http.delete(`apiURLhere/news/`+id);
    }
}
