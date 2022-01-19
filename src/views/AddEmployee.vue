<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-start">
        <h3 class="page-title">{{
          $route.params.id ?
              $route.params.name :
              'Add Employee'
        }}</h3>
        <button
          v-if="$route.params.id"
          @click="isResignationModal = true" class="button alert">Resign
        </button>
      </div>
      <div class="header-end">
        <button @click="$router.replace({ name: 'employee' })" class="button grey">Close</button>

        <!-- isOnFinish -->
        <button
            v-if="$route.name === 'document'"
            @click="$router.replace({ name: 'employee' })" class="button primary size-lg">Finish</button>

        <!-- isAddMode -->
        <button
            v-if="$route.name !== 'document' && $route.name === 'basic_detail'"
            @click="$refs.refRoute.saveAndContinue()"
            class="button primary">Save and continue</button>

        <!-- isEditMode -->
        <button
            v-if="$route.name !== 'document' && $route.name !== 'basic_detail'"
            @click="$refs.refRoute.saveOnly()" class="button primary">Save</button>
      </div>
    </div>

    <div class="steps" v-if="$route.params.id">
      <router-link
        :class="{ 'router-link-exact-active': $route.name === 'edit_basic_detail' }"
        :to="{name:'edit_basic_detail', params: { id: $route.params.id, name:  $route.params.name  } }" class="step "
      >1. Basic Detail
      </router-link>
      <!-- <router-link
          v-else
          :to="{name:'basic_detail'}" class="step "
      >1. Basic Detail
      </router-link> -->

      <router-link 
        :class="{ 'router-link-exact-active': $route.name === 'hiring_detail' }"
        :to="{name:'hiring_detail', params: { id: $route.params.id,  name: $route.params.name }}" class="step ">2. Hiring Detail
      </router-link>
      <router-link 
        :class="{ 'router-link-exact-active': $route.name === 'earning' }"
        :to="{name:'earning', params: { id: $route.params.id,  name:  $route.params.name }}" class="step">3. Earning / Deduction
      </router-link>
      <router-link
        :class="{ 'router-link-exact-active': $route.name === 'custom_field' }"
        :to="{name:'custom_field', params: { id: $route.params.id,  name:  $route.params.name }}" class="step">4. Custom Field
      </router-link>
      <router-link
        :class="{ 'router-link-exact-active': $route.name === 'document' }"
        :to="{name:'document', params: { id: $route.params.id,  name:  $route.params.name }}" class="step">5. Document
      </router-link>
    </div>

    <div class="page-content">
      <router-view ref="refRoute"></router-view>
    </div>

    <ResignationModal
        v-if="isResignationModal"
        @CloseModal="isResignationModal = false"
    />
  </div>
</template>

<script>
import ResignationModal from '@/components/Employee/Modal/resignation-modal'

export default {
  components: {
    ResignationModal
  },
  data: () => ({
    isResignationModal: false
  })
}
</script>

<style lang="scss" scoped>
.box {
  padding: 30px;
  border: 1px solid $border-color;
  box-shadow: unset;
  color: $font-color;
}

.steps {
  padding: 20px;
  border-bottom: 1px solid $border-color;
  display: flex;
  box-sizing: border-box;
  .step {
    color: $font-color;
    cursor: pointer;
    padding: 10px;
    flex-grow: 1;
    background-color: #fff;
    border-style: solid;
    border-color: $border-color;
    border-width: 1px 0 1px 1px;
    text-align: center;
    &:last-child{
      border-right-width: 1px;
    }
    // &::before {
    //   content: '';
    //   display: block;
    //   margin-bottom: 5px;
    //   height: 8px;
    //   border-radius: 8px;
    //   width: 100%;
    //   background-color: $border-color;
    // }
    // &.done {
    //   &::before {
    //     background-color: $sub-color;
    //   }
    // }

    &.router-link-exact-active {
      color: #fff;
      background-color: $primary-color;
    }

    &:first-child {
      padding-left: 0;
    }
  }
}
</style>