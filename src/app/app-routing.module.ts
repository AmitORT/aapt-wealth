import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/pages/home/home.component';
import { ProductDetailsComponent } from './views/pages/product-details/product-details.component';
import { ProductListingComponent } from './views/pages/product-listing/product-listing.component';
import { CompareProductsComponent } from './views/pages/compare-products/compare-products.component';
import { RiskProfilingComponent } from './views/pages/risk-profiling/risk-profiling.component';
import { CongratulationsComponent } from './views/pages/congratulations/congratulations.component';
import { WealthHomeComponent } from './views/pages/wealth-home/wealth-home.component';
import { WealthProductListingComponent } from './views/pages/wealth-product-listing/wealth-product-listing.component';
import { MutualSelectGoalComponent } from './views/pages/mutual-select-goal/mutual-select-goal.component';
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
import { StpComponent } from './views/pages/stp/stp.component';
import { SwitchFundComponent } from './views/pages/switch-fund/switch-fund.component';
import { SwpComponent } from './views/pages/swp/swp.component';
import { RedeemFundsComponent } from './views/pages/redeem-funds/redeem-funds.component';
import { OrderPlacedComponent } from './views/pages/order-placed/order-placed.component';
import { SwpSetupSuceesfulComponent } from './views/pages/swp-setup-suceesful/swp-setup-suceesful.component';
import { FundSwitchSuceesfulComponent } from './views/pages/fund-switch-suceesful/fund-switch-suceesful.component';
import { StpSetupSuceesfulComponent } from './views/pages/stp-setup-suceesful/stp-setup-suceesful.component';
import { AccountPortfolioComponent } from './views/pages/account-portfolio/account-portfolio.component';
import { AccountPortfolioProductDetailsComponent } from './views/pages/account-portfolio-product-details/account-portfolio-product-details.component';
import { DigitalGoldProductDetailsComponent } from './views/pages/digital-gold-product-details/digital-gold-product-details.component';
import { DigitalGoldPurchasedSuccessfulComponent } from './views/pages/digital-gold-purchased-successful/digital-gold-purchased-successful.component';
import { FdDetailsComponent } from './views/pages/fd-details/fd-details.component';
import { FdEligibilityComponent } from './views/pages/fd-eligibility/fd-eligibility.component';
import { FdOpenComponent } from './views/pages/fd-open/fd-open.component';
import { FdPaymentSuccessfulComponent } from './views/pages/fd-payment-successful/fd-payment-successful.component';
import { FdProductListComponent } from './views/pages/fd-product-list/fd-product-list.component';
import { BondProductListComponent } from './views/pages/bond-product-list/bond-product-list.component';
import { BondProductDetailsComponent } from './views/pages/bond-product-details/bond-product-details.component';
import { BondEligibilityComponent } from './views/pages/bond-eligibility/bond-eligibility.component';
import { BondSuccessfulComponent } from './views/pages/bond-successful/bond-successful.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product-details',component:ProductDetailsComponent},
  { path: 'product-listing',component:ProductListingComponent},
  { path: 'compare-products',component:CompareProductsComponent},
  { path: 'risk-profiling',component:RiskProfilingComponent},
  { path: 'congratulations',component:CongratulationsComponent},
  { path: 'wealth-home',component:WealthHomeComponent},
  { path: 'wealth-product-listing',component:WealthProductListingComponent},
  { path: 'mutual-select-goal',component:MutualSelectGoalComponent},
  { path: 'mutual-create-goal',component:MutualCreateGoalComponent},
  { path: 'mutual-fund-cart',component:MutualFundCartComponent},
  { path: 'mutual-payment-successful',component:MutualPaymentSuccessfulComponent},
  { path: 'mutual-investment',component:MutualInvestmentComponent},
  { path: 'account-desktop-menu',component:AccountDesktopMenuComponent}, 
  { path: 'account-kyc-verfication',component:AccountKycVerficationComponent}, 
  { path: 'account-linked-profiles',component:AccountLinkedProfilesComponent}, 
  { path: 'account-profile-details',component:AccountProfileDetailsComponent}, 
  { path: 'account-risk-profiling',component:AccountRiskProfilingComponent}, 
  { path: 'account-transactions',component:AccountTransactionsComponent}, 
  { path: 'account-goal-planning',component:AccountGoalPlanningComponent}, 
  { path: 'kyc-pan-verification',component:KycPanVerificationComponent},
  { path: 'wealth-product-details',component:WealthProductDetailsComponent},
  { path: 'account-bank-details',component:AccountBankDetailsComponent}, 
  { path: 'switch-redeem-funds',component:SwitchRedeemFundsComponent},
  { path: 'redeem-funds',component:RedeemFundsComponent},
  { path: 'swp',component:SwpComponent},
  { path: 'switch-fund',component:SwitchFundComponent},
  { path: 'stp',component:StpComponent},
  { path: 'order-placed',component:OrderPlacedComponent},
  { path: 'swp-setup-suceesful',component:SwpSetupSuceesfulComponent},
  { path: 'fund-switch-suceesful',component:FundSwitchSuceesfulComponent},
  { path: 'stp-setup-suceesful',component:StpSetupSuceesfulComponent},
  { path: 'account-portfolio',component:AccountPortfolioComponent},
  { path: 'account-portfolio-product-details',component:AccountPortfolioProductDetailsComponent},
  { path: 'digital-gold-product-details',component:DigitalGoldProductDetailsComponent},
  { path: 'digital-gold-purchased-successful',component:DigitalGoldPurchasedSuccessfulComponent},
  { path: 'FD-details',component:FdDetailsComponent},
  { path: 'FD-eligible',component:FdEligibilityComponent},
  { path: 'FD-open',component:FdOpenComponent},
  { path: 'FD-successful',component:FdPaymentSuccessfulComponent},
  { path: 'fd-product-list',component:FdProductListComponent},
  { path: 'bond-product-List',component:BondProductListComponent},
  { path: 'bond-details',component:BondProductDetailsComponent},
  { path: 'bond-eligibility',component:BondEligibilityComponent},
  { path: 'bond-successful',component:BondSuccessfulComponent}



































];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy',onSameUrlNavigation:'reload' }),
  BrowserAnimationsModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
