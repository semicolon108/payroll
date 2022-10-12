<template>
    <div class="page-container">
        <div class="page-header">
            <h3 class="page-title">Dashboard</h3>
            <div class="header-end">
                <!-- <button class="button" 
                    v-click-outside="()=>{ selectMonth = false }"
                    @click="selectMonth = !selectMonth">
                    <i class="fal fa-calendar-alt"></i>
                    Select Month
                    <div class="dropdown" v-if="selectMonth">
                        <div class="dropdown-list">
                            <div class="dropdown-list-item">
                                <i class="fal fa-calendar-alt"></i>
                                JAN
                            </div>
                            <div class="dropdown-list-item">
                                <i class="fal fa-calendar-alt"></i>
                                FEB
                            </div>
                            <div class="dropdown-list-item">
                                <i class="fal fa-calendar-alt"></i>
                                MAR
                            </div>
                            <div class="dropdown-list-item">
                                <i class="fal fa-calendar-alt"></i>
                                APR
                            </div>
                        </div>
                    </div>
                </button>
                <button class="button" 
                    v-click-outside="()=>{ selectYear = false }"
                    @click="selectYear = !selectYear">
                    <i class="fal fa-calendar-alt"></i>
                    Select Year
                    <div class="dropdown" v-if="selectYear">
                        <div class="dropdown-list">
                            <div class="dropdown-list-item">
                                <i class="fal fa-calendar-alt"></i>
                                Last Month
                            </div>
                            <div class="dropdown-list-item">
                                <i class="fal fa-calendar-alt"></i>
                                Last Quarters
                            </div>
                            <div class="dropdown-list-item">
                                <i class="fal fa-calendar-alt"></i>
                                Last Year
                            </div>
                            <div class="dropdown-list-item">
                                <i class="fal fa-calendar-alt"></i>
                                This Year
                            </div>
                        </div>
                    </div>
                </button> -->
                <button class="button primary" v-click-outside="()=>{ selectOption = false }" @click="selectOption = !selectOption">
                    <i class="fal fa-calendar-alt"></i>
                    This Month
                    <!-- <div class="dropdown" v-if="selectOption">
                        <div class="dropdown-list">
                            <div class="dropdown-list-item">
                                <i class="fal fa-calendar-alt"></i>
                                Last Month
                            </div>
                            <div class="dropdown-list-item">
                                <i class="fal fa-calendar-alt"></i>
                                Last Quarters
                            </div>
                            <div class="dropdown-list-item">
                                <i class="fal fa-calendar-alt"></i>
                                Last Year
                            </div>
                            <div class="dropdown-list-item">
                                <i class="fal fa-calendar-alt"></i>
                                This Year
                            </div>
                        </div>
                    </div> -->
                </button>
            </div>
        </div>
        <div class="page-content">
            <div class="columns">
                <div class="column is-3">
                    <div class="_card">
                        <span class="_card-icon"><i class="fas fa-wallet"></i></span>
                        <h3>{{ data.totalSalary | currency}}</h3>
                        <!-- <h3>270,160,000</h3> -->
                        <small>Net Pay</small>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="_card">
                        <span class="_card-icon"><i class="fas fa-clock"></i></span>
                        <h3>{{total.totalOT}}</h3>
                        <small>Over time</small>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="_card">
                        <span class="_card-icon"><i class="fas fa-percentage"></i></span>
                        <!-- <h3>65,320,000</h3> -->
                        <h3>{{data.totalTax | currency}}</h3>
                        <small>TAX</small>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="_card">
                        <span class="_card-icon"><i class="fas fa-heartbeat"></i></span>
                        <h3>{{data.totalSso | currency}}</h3>
                        <small>SSO</small>
                    </div>
                </div>
            </div>
    
            <!-- <pagination
                :show-size-changer="true"
                :defaultPageSize='10'
                :pageSizeOptions="['10', '20', '30', '40']"
                :default-current="3"
                :total="500"
        /> -->

         <!-- <div style="width: 612px; height: 881.861px; transform: scale(0.508017);">
        


        <div class="container">
  <div class="header">
    <div class="full-name">
      <span class="first-name">John</span> 
      <span class="last-name">Doe</span>
    </div>
    <div class="contact-info">
      <span class="email">Email: </span>
      <span class="email-val">john.doe@gmail.com</span>
      <span class="separator"></span>
      <span class="phone">Phone: </span>
      <span class="phone-val">111-222-3333</span>
    </div>
    
    <div class="about">
      <span class="position">Front-End Developer </span>
      <span class="desc">
        I am a front-end developer with more than 3 years of experience writing html, css, and js. I'm motivated, result-focused and seeking a successful team-oriented company with opportunity to grow. 
      </span>
    </div>
  </div>
   <div class="details">
    <div class="section">
      <div class="section__title">Experience</div>
      <div class="section__list">
        <div class="section__list-item">
          <div class="left">
            <div class="name">KlowdBox</div>
            <div class="addr">San Fr, CA</div>
            <div class="duration">Jan 2011 - Feb 2015</div>
          </div>
          <div class="right">
            <div class="name">Fr developer</div>
            <div class="desc">did This and that</div>
          </div>
        </div>
                <div class="section__list-item">
          <div class="left">
            <div class="name">Akount</div>
            <div class="addr">San Monica, CA</div>
            <div class="duration">Jan 2011 - Feb 2015</div>
          </div>
          <div class="right">
            <div class="name">Fr developer</div>
            <div class="desc">did This and that</div>
          </div>
        </div>

      </div>
    </div>
    <div class="section">
      <div class="section__title">Education</div>
      <div class="section__list">
        <div class="section__list-item">
          <div class="left">
            <div class="name">Sample Institute of technology</div>
            <div class="addr">San Fr, CA</div>
            <div class="duration">Jan 2011 - Feb 2015</div>
          </div>
          <div class="right">
            <div class="name">Fr developer</div>
            <div class="desc">did This and that</div>
          </div>
        </div>
        <div class="section__list-item">
          <div class="left">
            <div class="name">Akount</div>
            <div class="addr">San Monica, CA</div>
            <div class="duration">Jan 2011 - Feb 2015</div>
          </div>
          <div class="right">
            <div class="name">Fr developer</div>
            <div class="desc">did This and that</div>
          </div>
        </div>

      </div>
      
  </div>
     <div class="section">
      <div class="section__title">Projects</div> 
       <div class="section__list">
         <div class="section__list-item">
           <div class="name">DSP</div>
           <div class="text">I am a front-end developer with more than 3 years of experience writing html, css, and js. I'm motivated, result-focused and seeking a successful team-oriented company with opportunity to grow.</div>
         </div>
         
         <div class="section__list-item">
                    <div class="name">DSP</div>
           <div class="text">I am a front-end developer with more than 3 years of experience writing html, css, and js. I'm motivated, result-focused and seeking a successful team-oriented company with opportunity to grow. <a href="/login">link</a>
           </div>
         </div>
       </div>
    </div>
     <div class="section">
       <div class="section__title">Skills</div>
       <div class="skills">
         <div class="skills__item">
           <div class="left"><div class="name">
             Javascript
             </div></div>
           <div class="right">
                          <input  id="ck1" type="checkbox" checked/>

             <label for="ck1"></label>
                          <input id="ck2" type="checkbox" checked/>

              <label for="ck2"></label>
                         <input id="ck3" type="checkbox" />

              <label for="ck3"></label>
                           <input id="ck4" type="checkbox" />
            <label for="ck4"></label>
                          <input id="ck5" type="checkbox" />
              <label for="ck5"></label>

           </div>
         </div>
         
       </div>
       <div class="skills__item">
           <div class="left"><div class="name">
             CSS</div></div>
           <div class="right">
                          <input  id="ck1" type="checkbox" checked/>

             <label for="ck1"></label>
                          <input id="ck2" type="checkbox" checked/>

              <label for="ck2"></label>
                         <input id="ck3" type="checkbox" />

              <label for="ck3"></label>
                           <input id="ck4" type="checkbox" />
            <label for="ck4"></label>
                          <input id="ck5" type="checkbox" />
              <label for="ck5"></label>

           </div>
         </div>
         
       </div>
     <div class="section">
     <div class="section__title">
       Interests
       </div>
       <div class="section__list">
         <div class="section__list-item">
                  Football, programming.
          </div>
       </div>
     </div>
     </div>
  </div>
    </div> -->
    
            <video autoplay loop class="w-full" src="https://s1.sentry-cdn.com/_static/e0f43681a09b5d889040b0289ac4d921/sentry/dist/congrats-robots.c1aa5c.mp4"></video>
        </div>
    
        <!-- <iframe
            style="border: 5px dotted green;"
            
             srcdoc=""
             
             
             ></iframe> -->
    


   
    

    
    
    
    </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import { getPayrollByMonths } from '@/apis/payroll-api'
import { getTotalPayroll } from '@/apis/payroll-api'


//import Pagination from '@/utils/anna-pagination/es/pagination';
import '@/utils/anna-pagination/anna.css';
export default {
    components: {
        //    Pagination
    },
    directives: {
        clickOutside: vClickOutside.directive
    },
    data: () => ({
        selectMonth: false,
        selectYear: false,
        selectOption: false,
        data: {},
        total: {}
    }),
    methods: {
        async getPayrollByMonths() {
            const data = await getPayrollByMonths()
            this.data = data[0]
            this.total = await getTotalPayroll(this.data.monthlyPaymentId)
        }
    },
    created() {
        this.getPayrollByMonths()
    }
}
</script>

<style lang="scss" scoped>

// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }


.container {
  max-width: 700px;   
  background: #fff;
  margin: 0px auto 0px; 
  box-shadow: 1px 1px 2px #DAD7D7;
  border-radius: 3px;  
  padding: 40px;
  margin-top: 50px;
}

.header {
  margin-bottom: 30px;
  
  .full-name {
    font-size: 40px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  
  .first-name {
    font-weight: 700;
  }
  
  .last-name {
    font-weight: 300;
  }
  
  .contact-info {
    margin-bottom: 20px;
  }
  
  .email ,
  .phone {
    color: #999;
    font-weight: 300;
  } 
  
  .separator {
    height: 10px;
    display: inline-block;
    border-left: 2px solid #999;
    margin: 0px 10px;
  }
  
  .position {
    font-weight: bold;
    display: inline-block;
    margin-right: 10px;
    text-decoration: underline;
  }
}


.details {
  line-height: 20px;
  
  .section {
    margin-bottom: 40px;  
  }
  
  .section:last-of-type {
    margin-bottom: 0px;  
  }
  
  .section__title {
    letter-spacing: 2px;
    color: #54AFE4;
    font-weight: bold;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
  
  .section__list-item {
    margin-bottom: 40px;
  }
  
  .section__list-item:last-of-type {
    margin-bottom: 0;
  }
  
  .left ,
  .right {
    vertical-align: top;
    display: inline-block;
  }
  
  .left {
    width: 60%;    
  }
  
  .right {
    tex-align: right;
    width: 39%;    
  }
  
  .name {
    font-weight: bold;
  }
  
  a {
    text-decoration: none;
    color: #000;
    font-style: italic;
  }
  
  a:hover {
    text-decoration: underline;
    color: #000;
  }
  
  .skills {
    
  }
    
  .skills__item {
    margin-bottom: 10px;  
  }
  
  .skills__item .right {
    input {
      display: none;
    }
    
    label {
      display: inline-block;  
      width: 20px;
      height: 20px;
      background: #C3DEF3;
      border-radius: 20px;
      margin-right: 3px;
    }
    
    input:checked + label {
      background: #79A9CE;
    }
  }
}



</style>



<style lang="scss" scoped>
._card {
    padding: 20px;
    border: 1px solid $border-color;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    ._card-icon {
        display: inline-block;
        min-width: 50px;
        min-height: 50px;
        border-radius: 50px;
        text-align: center;
        background-color: rgba($sub-color, .2);
        i {
            line-height: 50px;
            font-size: 20px;
            color: $primary-color;
        }
    }
    h3 {
        margin-top: 5px;
        font-weight: 600;
        font-size: 24px;
        color: $font-color;
        display: flex;
        &::after {
            content: '₭';
            font-size: 14px;
            color: $dark-grey-color;
            margin-left: 5px;
            position: relative;
            top: 5px;
            font-weight: normal
        }
    }
    small {
        color: $dark-grey-color;
        font-size: 16px;
        display: block;
    }
}
</style>

