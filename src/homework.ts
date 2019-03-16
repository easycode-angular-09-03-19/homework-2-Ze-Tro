//================Task 1================
function addItemInfoDecorator(target: Object, method: string, descriptor: PropertyDescriptor) {
	let originalMethod = descriptor.value;
	const currentTime = new Date();
	let date: string = `${currentTime.getFullYear()}:${currentTime.getMonth()}:${currentTime.getDay()}:${currentTime.getHours()}:${currentTime.getMinutes()}`;
	descriptor.value = function() {
		let originalResult = originalMethod.apply(this);
		originalResult.date = date;
		originalResult.info = `${originalResult.name} - ${originalResult.price}`;
		return originalResult;
	};
}

class Item {
    public price: number;
    public name: string;

    constructor(name: string ,price: number) {
        this.name = name;
        this.price = price;
    }

    @addItemInfoDecorator
    public getItemInfo() {
		
        return {
            name: this.name, 
			price: this.price,
        };
    }
}

let item = new Item('Apple', 100);
console.log(item.getItemInfo());


//================Task 2================
function decorateClass(type: string) {
	return function(targetClass) {
		const currentTime = new Date();
		let date: string = `${currentTime.getFullYear()}:${currentTime.getMonth()}:${currentTime.getDay()}:${currentTime.getHours()}:${currentTime.getMinutes()}`;
		return class {
			createDate = date;
			type:string = type;

		};
	}
}

@decorateClass('User')
class User {
	type: string;
	constructor() {
		this.type;
	}
}

const someUser = new User();
console.log(someUser);


//================Task 3================
// News api USA
namespace Usa {
	export interface INews {
		id: number;
		title: string;
		text: string;
		author: string;
	}
	
	export class NewsService{
		protected apiurl: string = 'https://news_api_usa_url'
		public getNews() {} // method
	}
}

// News api Ukraine
namespace Ukraine {
	export interface INews {
		uuid: string;
		title: string;
		body: string;
		author: string;
		date: string;
		imgUrl: string;
	}
	
	export class NewsService {
		protected apiurl: string = 'https://news_api_2_url'
		public getNews() {} // method get all news
		public addToFavorite() {} // method add to favorites
	}

}

const americanNews = new Usa.NewsService();
console.log(americanNews);


//================Task 4================
class Junior {
    doTasks() {
        console.log('Actions!!!');
    }
}

class Middle {
    createApp() {
        console.log('Creating!!!');
    }
}

class Senior implements Junior, Middle{
	public doTasks(): void {}
	public createApp() :void {}
	public createArchitecture(): void {
		console.log('Disagreeing!!!');
	}
}

function applyMixins(targetClass: any, baseClasses: any[]) {
	baseClasses.forEach((baseClass) => {
		Object.getOwnPropertyNames(baseClass.prototype).forEach((name) => {
			targetClass.prototype[name] = baseClass.prototype[name];
		})
	})
}

applyMixins(Senior, [Junior, Middle]);

const max = new Senior();