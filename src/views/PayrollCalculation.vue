<template>
<transition name="slidedown" appear>
<section class="fullpage">
    <header>
        <div class="close-button"
            @click="$router.push({name: 'payroll_list'})">
        </div>
        <div class="step-list">
            <div class="step-item disabled">
                <div class="step-info">
                    <h3>Payroll of</h3> 
                    <p>November, 2020</p>
                </div>
            </div>
            <router-link
                :to="{name:'calculate_earning_deduction',
                params: { id: $route.params.id} }"
                tag="div"
                class="step-item">
                <div class="step-info">
                    <h3>Earning / Deuction</h3>
                    <p>80.000.000 LAK</p>
                </div>
            </router-link>

            <router-link 
                :to="{name:'calculate_overtime',
                params: { id: $route.params.id} }"
                tag="div"
                class="step-item">
                <div class="step-info">
                    <h3>Over Time</h3>
                    <p>N/A</p>
                </div>
            </router-link>

            <router-link 
                :to="{name:'calculate_payroll',
                params: {id: $route.params.id} }"
                tag="div"
                class="step-item">
                <div class="step-info">
                    <h3>Payroll</h3>
                    <p>200.000.000 LAK</p>
                </div>
            </router-link>
            <div class="step-item">
                Finish
            </div>
        </div>
    </header>
    <section class="section content">
        <div class="container">
            <transition name="fade"> 
                <router-view></router-view>
            </transition>
        </div>
    </section>
</section>
</transition>
</template>

<script>
    export default {
        created(){
            document.documentElement.style.overflow = 'hidden'
        },
        beforeDestroy(){
            document.documentElement.style.overflow = 'auto'
        }
    }
</script>

<style lang="scss" scoped>

.content{
    overflow: auto; 
}
.fullpage{
    box-shadow: 0 0 0 100px rgba(#000, .8);
    background-color: #fff;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    overflow: hidden;
    width: 100%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    header{
        position: relative;
        display: flex;
        .close-button{
            content: '';
            position: relative;
            z-index: 1;
            min-height: 50px;
            width: 60px;
            background-color: rgba($grey-color, .4);
            cursor: pointer;
            &::before{
                content: "";
                background-color: $grey-color;
                height: 2px;
                width: 30px;
                display: block;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translateX(-50%) translateY(-50%) rotate(45deg);
                transform-origin: center center;
            }
            &::after{
                content: "";
                background-color: $grey-color;
                height: 30px;
                width: 2px;
                display: block;
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translateX(-50%) translateY(-50%) rotate(45deg);
                transform-origin: center center;
            }
        }
        .step-list{
            display: flex;
            flex-grow: 1;
            .step-item{
                border-right: 1px solid rgba($grey-color, .3);
                border-bottom: 1px solid rgba($grey-color, .3);
                color: $font-color;
                flex-grow: 1;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                &.router-link-exact-active{
                    background-color: $primary-color;
                    color: #fff;
                }
                &.disabled{
                    max-width: 180px;
                    color: $font-color;
                    pointer-events: none;
                    background-color: $light-grey-color;
                }
                .step-info{
                    padding: 5px 0;
                    h3{
                        font-weight: 700;
                        font-size: 18px;
                    }
                    span{
                        font-size: 16px;
                    }
                }
            }
        }
    }
}





// close icon
.close:before, .close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 24px;
  width: 2px;
  background-color: $grey-color;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}




// Tab transition
.fade-enter-active {
  transition: all .6s ease;
}
.fade-leave-active {
  transition: all .1s ease;
}
.fade-enter {
  transform: translateY(100px);
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}

// Page transition
.slidedown-enter-active {
    transition: all .6s ease;
}
.slidedown-leave-active {
    transition: all .2s ease;
}
.slidedown-enter {
    transform: translateY(100px);
    opacity: 0;
}
.slidedown-leave-to {
    transform: translateY(100px);
    opacity: 0;
}

</style>