<template>
  <div>
    <div class="page-header">
      <h3 class="page-title">{{
          $route.params.id ?
              'Edit Employee' :
              'Add Employee'
        }}</h3>
      <button
          v-if="$route.params.id"
          @click="isResignationModal = true" class="button alert">Resignation</button>

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
          v-if="$route.params.id"
          :to="{name:'edit_basic_detail', params: { id: $route.params.id }}" class="step "
      >1. Basic Detail
      </router-link>
      <router-link
          v-else
          :to="{name:'basic_detail'}" class="step "
      >1. Basic Detail
      </router-link>
      <router-link :to="{name:'hiring_detail', params: { id: $route.params.id }}" class="step">2. Hiring Detail
      </router-link>
      <router-link :to="{name:'earning'}" class="step">3. Earning / Deduction</router-link>
      <router-link :to="{name:'custom_field'}" class="step">4. Custom Field</router-link>
      <router-link :to="{name:'document'}" class="step">5. Document</router-link>
    </div>
    <div class="box">
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
  margin-bottom: 20px;
  display: flex;
  box-sizing: border-box;

  .step {
    color: $font-color;
    cursor: pointer;
    padding: 5px;
    flex-grow: 1;

    &::before {
      content: '';
      display: block;
      margin-bottom: 5px;
      height: 8px;
      border-radius: 8px;
      width: 100%;
      background-color: $border-color;
    }

    &.done {
      &::before {
        background-color: $sub-color;
      }
    }

    &.router-link-exact-active {
      color: $primary-color;
      font-weight: 700;

      &::before {
        content: '';
        display: block;
        width: 100%;
        background-color: $primary-color;
      }
    }

    &:first-child {
      padding-left: 0;
    }
  }
}
</style>