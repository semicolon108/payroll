<template>
    <div>
        <div class="page-header">
            <h3 class="page-title">Employee</h3>
            <button class="button primary" @click="$router.push({name:'basic_detail'})"><i class="fas fa-plus"></i> Add</button>
        </div>
        <div class="box">
            <table class="table is-fullwidth" id="my-table">
                <thead>
                    <tr>
                        <th class="is-xs">Photo</th>
                        <th>Full Name</th>
                        <th class="is-hidden-mobile">Position</th>
                        <th class="is-hidden-mobile">Deparment</th>
                        <th>Status</th>
                        <th class="is-xs is-right">Option</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in employees" :key="index">
                        <td class="is-xs" v-if="i.image">
                          <div :style="{ backgroundImage: 'url('+ i.image.src +')' }" class="photo"></div>
                        </td>
                        <td class="is-xs" v-else>
                          <div v-if="i.gender === 'Male'" :style="{ backgroundImage: 'url('+ 'https://scontent.fvte3-1.fna.fbcdn.net/v/t1.15752-9/140251705_457048842135240_4704188877788428268_n.png?_nc_cat=102&ccb=2&_nc_sid=ae9488&_nc_eui2=AeGxkU95l9xEHwch1Zxplsx5IytlsIEl9ZojK2WwgSX1mli_dZJt_MTQr2lOvF1matKd0pIjPrQ1NPOjBMfleMFu&_nc_ohc=UB0B-fUjp-kAX_pTAhL&_nc_ht=scontent.fvte3-1.fna&oh=cfd12a486324e8e6a1e55baa74f4f14b&oe=602C88F1' +')' }" class="photo"></div>

                          <div v-else :style="{ backgroundImage: 'url('+ 'https://scontent.fvte3-1.fna.fbcdn.net/v/t1.15752-9/139135444_1150433082054095_1036264055400093887_n.png?_nc_cat=101&ccb=2&_nc_sid=ae9488&_nc_eui2=AeEKwJUIoUpXN2RcbJoxZIfwbvHzfcGpIERu8fN9wakgRPeGxT5Z79T21TVl41fevSQXFmfxRNdwULFebR9IEWjC&_nc_ohc=IjdD4D0RxLIAX_4-4hW&_nc_oc=AQkBe3G3cgHjKmTz_MYhwHKeBjWEtTCqiQlzldRfV02FOuIovaNCmHppI_dX4n-9TNg&_nc_ht=scontent.fvte3-1.fna&oh=78d9515d21c893039859e07521f34981&oe=602C2B2A' +')' }" class="photo"></div>
                          
                        </td>
                        
                        <td>{{i.firstName}} {{i.lastName}}</td>
                        <td class="is-hidden-mobile">{{  i.position  }}</td>
                        <td class="is-hidden-mobile">{{  i.department  }}</td>
                        <td > {{ i.isCompleted ? 'Completed' : 'Incomplete' }}</td>
                        <td>
                            <div class="icons">
                                <span v-if="i.isCompleted" @click="$router.push({ name: 'edit_basic_detail', params: { id: i._id } } )" class="icon"><i class="fas fa-pen"></i></span>
                              <span v-else @click="$router.push({ name: 'hiring_detail', params: { id: i._id } } )" class="icon"><i class="fas fa-pen"></i></span>
<!--                                <span class="icon"><i class="fas fa-trash"></i></span>-->
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {GET_EMPLOYEES} from "@/graphql/Employee";

    export default {
        data: () => ({
          employees: []
        }),
      methods: {
          async getEmployees() {
            try {
              const res = await this.$apollo.query({
                query: GET_EMPLOYEES
              })
              this.employees = res.data.getEmployees
            } catch (err) {
              throw new Error(err)
            }
          }
      },
      created() {
          this.getEmployees()
      }
    }
</script>

<style lang="scss" scoped>

</style>