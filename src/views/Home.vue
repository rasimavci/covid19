<template>
  <div class="istatistik">
    
    <div>
      <container class="gen-container">
       <div class="user__list-offer">
          <div class="covid-statistic">
            <div class="statistic-top">

              <div class="statistic__item">
                <h3 class="statistic__item-title">ACTIVE CASES</h3>
                <div class="statistic__item-middle">
                  <p class="statistic__item-number" v-if="liveData"> {{liveData.Active}}</p>
                  <p class="statistic__item-text">Active Cases</p>
                </div>
                <p class="statistic__item-days">
                  
                </p>
              </div>

              <div class="statistic__item">
                <h3 class="statistic__item-title">DEATHS</h3>
                <div class="statistic__item-middle">
                  <p class="statistic__item-number" v-if="liveData">{{liveData.Deaths}}</p>
                  <p class="statistic__item-text">People Dead</p>
                </div>
                <p class="statistic__item-days">
                 <span class="oclcok">
                    <svg-icon type="icon-oclock"/>
                  </span>
                  All Times Total
                </p>
              </div>

              <div class="statistic__item">
                <h3 class="statistic__item-title">Confirmed</h3>
                <div class="statistic__item-middle">
                  <p class="statistic__item-number" v-if="liveData"> {{liveData.Confirmed}}</p>
                  <p class="statistic__item-text">People Infected</p>
                </div>
                <p class="statistic__item-days">
                 <span class="oclcok">
                    <svg-icon type="icon-oclock"/>
                  </span>
                  All Times Total
                </p>
              </div>

              <div class="statistic__item">
                <h3 class="statistic__item-title">Recovered</h3>
                <div class="statistic__item-middle">
                  <p class="statistic__item-number" v-if="liveData"> {{liveData.Recovered}}</p>
                  <p class="statistic__item-text">People Recovered</p>
                </div>
                <p class="statistic__item-days">
                     <span class="oclcok">
                    <svg-icon type="icon-oclock"/>
                  </span>
                  All Times Total
                </p>
              </div>
            </div>
          </div>

          <div class="report">
            <div class="report__top">
              <div class="report-left">
                <p class="report__title">COVID19 REPORT</p>
                <p class="report__text">Maximum numbers for The Country Turkey</p>
              </div>
            </div>

            <div class="report__bottom">
              <div class="report__bottom-item">
                <div class="report-icon">
                 <span class="oclcok">
                    <svg-icon type="icon-oclock"/>
                  </span>
                </div>
                <div class="report-detail" >
                  <p class="report-detail__number">{{maxInfection.Lon}}</p>
                  <p class="report-detail__number">{{maxInfection.Date}}</p>
                  <p class="report-detail__text">Maximum Infection</p>
                </div>
               </div>
               <div class="report__bottom-item">
                <div class="report-icon" style="background-color: #ff7676">
                 <span class="oclcok">
                    <svg-icon type="icon-mail"/>
                  </span>
                </div>
                <div class="report-detail">
                  <p class="report-detail__number">{{maxDeath.Lon}}</p>
                  <p class="report-detail__number">{{maxDeath.Date}}</p>
                  <p class="report-detail__text">Maximum Death</p>
                </div>
              </div>
              <div class="report__bottom-item">
                <div class="report-icon" style="background-color: #3dc6a7">
                 <span class="oclcok">
                    <svg-icon type="icon-headphone"/>
                  </span>
                </div>
                <div class="report-detail">
                  <p class="report-detail__number">{{maxRecovered.Lon}}</p>
                  <p class="report-detail__number">{{maxRecovered.Date}}</p>
                  <p class="report-detail__text">Maximum Recovered</p>
                </div>
              </div>

             </div>
          </div>

        </div>
      </container>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    ContentLoader
  },  
  data () {
    return {
      maxInfection: 0,
      maxDeath: 0,
      maxRecovered: 0,
      maxActive: 0,
      covidData: [],
      ConfirmedCases: [],
      covidDataRecovered: [],
      covidDataActive: [],
      covidDataDeath: [],
      liveData: null,
      errors: []
    }
  },
  methods: {
     getMaxInfection(opt) {
      let self = this
      axios.get(`/country/${opt.Country}/status/confirmed?from=2020-03-11T00:00:00Z&to=2020-05-27T00:00:00Z`)
        .then(response => {
          self.ConfirmedCases = response.data
          
          self.ConfirmedCases.map((content, index, array) => {
            if(array[index+1]) {
              self.ConfirmedCases[index].Lon = array[index+1].Cases - array[index].Cases
              }
          })

          self.maxInfection = self.ConfirmedCases.reduce(function(prev, current) {
          return (prev.Lon > current.Lon) ? prev : current
           })
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
     getMaxDeath(opt) {
      let self = this
      axios.get(`/country/${opt.Country}/status/deaths?from=2020-03-11T00:00:00Z&to=2020-05-27T00:00:00Z`)
        .then(response => {
          self.covidDataDeath = response.data

          self.covidDataDeath.map((content, index, array) => {
            if(array[index+1]) {
              self.covidDataDeath[index].Lon = array[index+1].Cases - array[index].Cases
              }
          })

          self.maxDeath = self.covidDataDeath.reduce(function(prev, current) {
          return (prev.Lon > current.Lon) ? prev : current
           })
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
     getMaxRecovered(opt) {
      let self = this
      axios.get(`/country/${opt.Country}/status/recovered?from=2020-03-11T00:00:00Z&to=2020-05-27T00:00:00Z`)
        .then(response => {
          self.covidDataRecovered = response.data

          self.covidDataRecovered.map((content, index, array) => {
            if(array[index+1]) {
              self.covidDataRecovered[index].Lon = array[index+1].Cases - array[index].Cases
              }
          })

          self.maxRecovered = self.covidDataRecovered.reduce(function(prev, current) {
          return (prev.Lon > current.Lon) ? prev : current
           })
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
     getMaxActive(opt) {
      let self = this
      axios.get(`/country/${opt.Country}/status/confirmed?from=2020-03-11T00:00:00Z&to=2020-05-27T00:00:00Z`)
        .then(response => {
          self.covidDataActive = response.data

          self.covidDataActive.map((content, index, array) => {
            if(array[index+1]) {
              self.covidDataActive[index].Lon = array[index+1].Cases - array[index].Cases
              }
          })

          self.maxActive = self.covidDataActive.reduce(function(prev, current) {
          return (prev.Lon > current.Lon) ? prev : current
           })
        })
        .catch(e => {
          this.errors.push(e)
        })
    },        
    getLiveData(opt) {
      let self = this
      axios.get(`/country/${opt.Country}`)
        .then(response => {
          self.liveData = response.data[[response.data.length-2]]
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
  },
  created() {
    const country =   {
      Country: 'Turkey',
      Slug: 'turkey',
      ISO2: 'TR'
    }
    this.getLiveData(country)
    this.getMaxInfection(country)
    this.getMaxDeath(country)
    this.getMaxRecovered(country)
    this.getMaxActive(country)
  }
}
</script>

<style lang="scss">

  .istatistik {
    .dorm-account-wrp{
      width: 100%;
    }
    .gen-container{
      flex-direction: column;
    }

    .select__placeholder{
      font-size: 16px;
      font-weight: 100;
    }

    .select__caret{
      background-color: #f5f8fc;
      width: 28px;
      height: 28px;
      font-size:10px;
    }
    .user-settings__profil {
      width: 100%;

    }
    .select-box {
      border-bottom: 0 !important;
    }

    .user-settings__top{
      border-bottom: 1px solid #cbd0dd6b;
    }

    .user-settings__profil{
      display: flex;
      justify-content: space-between;
      .left-one{
        display: flex;
        align-items: center;
      }
    }
    .user-settings__profil-img {
      width: 100%;
      border: 3px solid white;
      border-radius: 10px;
      background-color: white;
      padding: 13px;
      box-shadow: 0px 8px 60px 0px rgba(62, 62, 141, 0.05);
    }
    .user-settings__profil-mail {
      margin-right: 102px;
      color: #656e8d;
      font-size: 19px;
      font-weight: bold;
    }
    .user-settings__profil-name.mail {
      font-size: 16px;
      padding-right: 35px;
      .sign-out{
        margin-left: 16px;
        font-size: 24px;
        font-weight: bold;
      }

    }

    .container2 {
      display: block;
      position: relative;
      padding-bottom: 8px;
      cursor: pointer;
      font-size: 22px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      width: 48%;
      margin-right: 16px;
    }

    .container2 input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkmark {
      position: absolute;
      left: 6px;
      height: 14px;
      width: 14px;
      border-radius: 3px;
      background-color: #eff3fb;
      border: 1px solid #d8d8d8;
    }

    /* On mouse-over, add a grey background color */
    .container2:hover input ~ .checkmark {
      background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .container2 input:checked ~ .checkmark {
      background-color: #15d2a3;
      border-color: #15d2a3;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }

    /* Show the checkmark when checked */
    .container2 input:checked ~ .checkmark:after {
      display: block;
    }

    /* Style the checkmark/indicator */
    .container2 .checkmark:after {
      left: 4px;
      top: 1px;
      width: 5px;
      height: 9px;
      border: 1px solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    .covid-statistic {
      margin-top: 20px;

      .statistic {
        &-top {
          display: flex;
          justify-content: space-between;
        }

        &__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: white;
          padding: 31px 0px;
          border-radius: 14px;
          box-shadow: 0px 8px 60px 0px rgba(62, 62, 141, 0.05);
          position: relative;
          width: 25%;
          margin-right: 17px;


          &:last-child {
            margin-right: 0;
          }

          &-title {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            text-align: center;
            padding: 22px 0 11px 0px;
            font-size: 16px;
            font-weight: bold;
            border-bottom: 1px solid #f9f9f9;
            color: #4b5da1;
          }

          &-middle {
            text-align: center;
            margin-top: 21px;
            margin-bottom: 11px;
          }

          &-text {
            position: relative;
            top: -21px;
          }

          &-number {
            font-size: 60px;
          }

          &-days {
            position: absolute;
            bottom: 11px;
            left: 0;
            width: 100%;
            text-align: center;
            border-top: 1px solid #f9f9f9;
            padding: 12px 0 0px 0;
            color: #a1a7be;
            font-size: 16px;
            margin-left: 3px;

            .oclcok {
              position: relative;
              top: -2px;
              font-size: 15px;
              color: #4face2;
              position: relative;
              left: -5px;
            }
          }
        }
      }
    }

    .report {
      background-color: white;
      border-radius: 9px;
      margin-top: 29px;
      padding: 20px 28px;
      box-shadow: 0px 8px 60px 0px rgba(62, 62, 141, 0.05);

      &__top {
        display: flex;
        align-items: center;
      }

      &-right {
        width: 30%;
        margin-left: 0;
        display: flex;       
        &__item {
          width: 50%;
        }
      }

      &__title {
        color: #4b5da1;
        font-weight: bold;
        font-size: 16px;
      }

      &__text {
        color: #a1a7be;
        font-size: 16px;
      }

      &__bottom {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid whitesmoke;
        padding: 20px 0;
        margin: 15px 0;


        &-item {
          display: flex;
          width: 24%;
          background-color: #f5f8fc;
          align-items: center;
          justify-content: space-evenly;
          padding: 15px 0;
          border-radius: 8px;

        }
      }

      &-icon {
        color: white;
        background-color: #62b2eb;
        padding: 11px 15px;
        border-radius: 100%;
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;

        .oclcok {
          position: relative;
          left: 0px;
        }
      }

      &-detail {
        &__number {
          color: #62b2eb;
          font-weight: bold;
        }

        &__text {
          color: #a1a7be;
          font-size: 15px;
          position: relative;
          margin-top: -9px;
        }
      }

    }
  }
  .mywidth {
    width: 130%;
            margin-left: 0;
  }

</style>
