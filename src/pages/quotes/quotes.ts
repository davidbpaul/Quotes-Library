import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Quote } from "../../data/quote.interface";
import { AlertController } from "ionic-angular";
import { QuotesService} from "../../services/quotes";
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html'
})
export class QuotesPage implements OnInit{

  quoteGroup: {category: string, quotes: Quote[], icon: string}

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private quotesService: QuotesService
  ) {

  }
  ngOnInit(){
    this.quoteGroup = this.navParams.data
  }
  // ionViewDidLoad(){
  //   this.quoteGroup = this.navParams.data
  // }
  onAddToFavorites(selectedQuote: Quote){
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to add the Quote',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler:()=>{
            this.quotesService.addQuoteToFavorites(selectedQuote)
          }
        },
        {
          text: 'No, I changed my mind!',
          role: 'cancel',
          handler: () => {
            console.log("no")
          }
        }
      ]
    });
    alert.present();
  }
  onRemoveFromFavorites(quote: Quote){
    this.quotesService.removeQuoteFromFavorites(quote);
  }
  isFavorite(quote: Quote){
    return this.quotesService.isQuoteFavorite(quote)
  }
}
