import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/shared/header/header.component';
import { FooterComponent } from './views/shared/footer/footer.component';
import { HomeComponent } from './views/pages/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductDetailsComponent } from './views/pages/product-details/product-details.component';
import { ProductListingComponent } from './views/pages/product-listing/product-listing.component';
import { CompareProductsComponent } from './views/pages/compare-products/compare-products.component';
import { RiskProfilingComponent } from './views/pages/risk-profiling/risk-profiling.component';
import { CongratulationsComponent } from './views/pages/congratulations/congratulations.component';
import { WealthHomeComponent  } from './views/pages/wealth-home/wealth-home.component';
import { WealthProductListingComponent  } from './views/pages/wealth-product-listing/wealth-product-listing.component';
import { MutualSelectGoalComponent  } from './views/pages/mutual-select-goal/mutual-select-goal.component';
import { MutualCreateGoalComponent } from './views/pages/mutual-create-goal/mutual-create-goal.component';
import { MutualFundCartComponent } from './views/pages/mutual-fund-cart/mutual-fund-cart.component';
import { MutualPaymentSuccessfulComponent } from './views/pages/mutual-payment-successful/mutual-payment-successful.component';
import { MutualInvestmentComponent } from './views/pages/mutual-investment/mutual-investment.component';
import { AccountDesktopMenuComponent } from './views/pages/account-desktop-menu/account-desktop-menu.component';
import { AccountKycVerficationComponent } from './views/pages/account-kyc-verfication/account-kyc-verfication.component';
import { AccountLinkedProfilesComponent } from './views/pages/account-linked-profiles/account-linked-profiles.component';
import { AccountProfileDetailsComponent } from './views/pages/account-profile-details/account-profile-details.component';
import { AccountRiskProfilingComponent } from './views/pages/account-risk-profiling/account-risk-profiling.component';
import { AccountTransactionsComponent } from './views/pages/account-transactions/account-transactions.component';
import { AccountGoalPlanningComponent } from './views/pages/account-goal-planning/account-goal-planning.component';
import { KycPanVerificationComponent } from './views/pages/kyc-pan-verification/kyc-pan-verification.component';
import { WealthProductDetailsComponent } from './views/pages/wealth-product-details/wealth-product-details.component';
import { AccountBankDetailsComponent } from './views/pages/account-bank-details/account-bank-details.component';
import { SwitchRedeemFundsComponent } from './views/pages/switch-redeem-funds/switch-redeem-funds.component';
import { RedeemFundsComponent } from './views/pages/redeem-funds/redeem-funds.component';
import { SwpComponent } from './views/pages/swp/swp.component';
import { SwitchFundComponent } from './views/pages/switch-fund/switch-fund.component';
import { StpComponent } from './views/pages/stp/stp.component';
import { OrderPlacedComponent } from './views/pages/order-placed/order-placed.component';
import { SwpSetupSuceesfulComponent } from './views/pages/swp-setup-suceesful/swp-setup-suceesful.component';
import { FundSwitchSuceesfulComponent } from './views/pages/fund-switch-suceesful/fund-switch-suceesful.component';
import { StpSetupSuceesfulComponent } from './views/pages/stp-setup-suceesful/stp-setup-suceesful.component';
import { AccountPortfolioComponent } from './views/pages/account-portfolio/account-portfolio.component';
import { AccountPortfolioProductDetailsComponent } from './views/pages/account-portfolio-product-details/account-portfolio-product-details.component';
import { DigitalGoldProductDetailsComponent } from './views/pages/digital-gold-product-details/digital-gold-product-details.component';
import { DigitalGoldPurchasedSuccessfulComponent } from './views/pages/digital-gold-purchased-successful/digital-gold-purchased-successful.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LayoutComponent,
    ProductDetailsComponent,
    ProductListingComponent,
    CompareProductsComponent,
    RiskProfilingComponent,
    CongratulationsComponent,
    WealthHomeComponent,
    WealthProductListingComponent,
    MutualSelectGoalComponent,
    MutualCreateGoalComponent,
    MutualFundCartComponent,
    MutualPaymentSuccessfulComponent,
    MutualInvestmentComponent,
    AccountDesktopMenuComponent,
    AccountKycVerficationComponent,
    AccountLinkedProfilesComponent,
    AccountProfileDetailsComponent,
    AccountRiskProfilingComponent,
    AccountTransactionsComponent,
    AccountGoalPlanningComponent,
    KycPanVerificationComponent,
    WealthProductDetailsComponent,
    AccountBankDetailsComponent,
    SwitchRedeemFundsComponent,
    RedeemFundsComponent,
    SwpComponent,
    SwitchFundComponent,
    StpComponent,
    OrderPlacedComponent,
    SwpSetupSuceesfulComponent,
    FundSwitchSuceesfulComponent,
    StpSetupSuceesfulComponent,
    AccountPortfolioComponent,
    AccountPortfolioProductDetailsComponent,
    DigitalGoldProductDetailsComponent,
    DigitalGoldPurchasedSuccessfulComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CarouselModule,
    NgxSliderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut:3000,preventDuplicates:true})
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
