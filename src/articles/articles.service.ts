import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './intefaces/article.interface';

@Injectable()
export class ArticlesService {
    articles: Article[] = [
        {
            id: 1,
            title: 'This is my Title',
            content: 'This is the content of my article...',
            read: true
        },
        {
            id: 2,
            title: 'This is my Title 2',
            content: 'This is the content of my second article...',
            read: false
        },
        {
            id: 3,
            title: 'This is my third 3',
            content: 'Test new content article...'
        },
        {
            id: 4,
            title: 'My Article',
            content: 'My new content...'
        }
    ];

    findAll() : Article[]{
        return this.articles;
    }

    create(article: CreateArticleDto){
        this.articles = [...this.articles, article as Article]
    }

    findOne(id: string){
        return this.articles.find(article => article.id === Number(id) );
    }

    update(id: string, article: Article){
        // recup. de l'article par son id
        const articleToUpdate = this.articles.find(a => a.id === +id);
        if (!articleToUpdate){
            return new NotFoundException('Oups id '+id+' does not match any article :(');
        }
        // faire les modifs
        if (article.hasOwnProperty('read')) articleToUpdate.read = article.read;
        if (article.title) articleToUpdate.title = article.title;
        if (article.content) articleToUpdate.content = article.content;

        const updatedArticles = this.articles.map(a => a.id !== +id ? a : articleToUpdate);
        this.articles = [...updatedArticles];
        return { articleToUpdate: 1, articles: updatedArticles}
    }

    delete(id: string){
        // recup. de l'index de l'article par son id
        const indexToDelete = this.articles.findIndex(a => a.id === +id);
        // si l'index n'est pas trouvé on retourne une exception
        if (indexToDelete<0){
            return new NotFoundException('Oups id '+id+' does not match any article :(');
        }
        // sinon on retire l'élément correspondant du tableau
        this.articles.splice(indexToDelete,1);
        return { articleToDelete: 1, articles: this.articles };
    }
}
