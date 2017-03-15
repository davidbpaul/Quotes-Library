import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import {Quote} from "../../data/quote.interface";
import {QuotesService} from "../../services/quotes";
import {SettingsService} from "../../services/settings";
import {QuotePage} from "../quote/quote";
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  quotes: Quote[];

  constructor (
    private quoteService: QuotesService,
    private modalCtrl: ModalController,
    private settingsService: SettingsService
  ){


  }
  ionViewWillEnter(){
    this.quotes = this.quoteService.getFavoriteQuotes();
  }
  onViewQuote(quote: Quote){
    console.log('click')
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if(remove){
        this.onRemoveFromFavorites(quote)
      }
    });
  }
  onRemoveFromFavorites(quote: Quote){
    this.quoteService.removeQuoteFromFavorites(quote);
    // this.quotes = this.QuotesService.getFavoriteQuotes();
    const position = this.quotes.findIndex((quoteEl: Quote)=>{
      return quoteEl.id == quote.id
    })
    this.quotes.splice(position, 1)
  }
  getBackground(){
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground'
  }
  isAltBackground(){
    return this.settingsService.isAltBackground()
  }
}
