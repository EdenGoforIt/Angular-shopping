import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
	recipes: Recipe[] = [
		new Recipe(
			'Ddukbokki recipe',
			'you do whatever you want to do',
			'https://image.shutterstock.com/image-photo/hot-spicy-rice-cake-tteokbokki-600w-1989112874.jpg'
		),
		new Recipe(
			'Whatever recipe',
			'you do whatever you want to do',
			'https://image.shutterstock.com/image-photo/hot-spicy-rice-cake-tteokbokki-600w-1989112874.jpg'
		),
	];
	constructor() {}

	ngOnInit(): void {}
}
