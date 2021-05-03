import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

// localhost:3000/articles
@Controller('articles')
export class ArticlesController {
    constructor(private articlesService: ArticlesService){}
    
    @Get()
    findAll(): any[]{
        return this.articlesService.findAll();
    }

    @Post()
    createArticle(@Body() newArticle: CreateArticleDto){
        console.log('newArticle', newArticle);
        this.articlesService.create(newArticle);
    }

    @Get(':id')
    findOne(@Param('id') id:string){ 
        console.log('Param id',id);
        return this.articlesService.findOne(id);
    }

    @Patch(':id')
    updateArticle(@Param('id') id:string, @Body() article: CreateArticleDto){
        console.log('Param id',id);
        console.log('Article', article);
        return this.articlesService.update(id,article);
    }

    @Delete(':id')
    deleteArticle(@Param('id') id:string){
        return this.articlesService.delete(id);
    }
}