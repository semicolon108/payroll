<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-start">
        <h3 class="page-title">Custom Fomula</h3>
        <button class="button primary"><i class="fas fa-plus"></i> Add</button>
      </div>
      <div class="header-end"></div>
    </div>

    <div class="page-content no-padding">
      <div class="group" v-for="(i, index) in 3" :key="index">
        <span class="del"><i class="fa-solid fa-trash"></i></span>
        <div class="formula margin-bottom-30">
          <div class="formula-header">
            <input
              type="text"
              class="section-title"
              placeholder="Group Title"
            />

            <fieldset>
              <div class="select">
                <select>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </fieldset>

            <button class="button primary">Save</button>
          </div>
          <ul>
            <li>This Month Salary</li>
            <li class="operator">
              <span><i class="fa-solid fa-plus"></i></span>
              <ul>
                <li><i class="fa-solid fa-minus"></i></li>
                <li><i class="fa-solid fa-divide"></i></li>
                <li><i class="fa-solid fa-multiply"></i></li>
              </ul>
            </li>
            <li>earningBeforeTax</li>
            <li class="operator"><i class="fa-solid fa-plus"></i></li>
            <li>earningBeforeTax</li>
          </ul>
        </div>
        <div class="allowance">
          <h1 class="section-title">Allowance List</h1>
          <ul>
            <li v-for="(i, index) in 20" :key="index">This Month Salary</li>
            <li class="used">earningBeforeTax</li>
            <li>earningBeforeTax</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.group {
  margin-bottom: 30px;
  border-radius: 5px;
  padding: 30px;
  background-color: $light-bg-color;
  position: relative;
  border: 1px solid $border-color;
  .del {
    position: absolute;
    top: 0;
    right: 0;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($dark-grey-color, 0.1);
    border-radius: 0 0 0 5px;
    cursor: pointer;
    i {
      color: $alert-color;
    }
  }
  .formula {
    .formula-header {
      display: flex;
      align-items: flex-end;
      margin-bottom: 20px;
      input {
        height: 100%;
      }
      .select {
        text-align: center;
        &::after {
          display: none;
        }
        select {
          padding-left: 10px;
          padding-right: 10px;
          text-align: center;
          option {
            text-align: center;
          }
        }
      }
    }
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      li {
        cursor: pointer;
        background-color: $primary-color;
        color: #fff;
        @include sm-font;
        margin: 0;
        border-radius: 5px;
        padding: 8px 15px;
        display: flex;
        align-items: center;
      }
      .operator {
        background-color: rgba($grey-color, 0.5);
        color: $font-color;
        position: relative;
        i {
          @include sm-font;
        }
        ul {
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 3px;
          top: 43px;
          left: 0;
          li {
            display: inline-block;
            background-color: $grey-color !important;
            color: $font-color;
          }
        }
      }
    }
  } // fomula
  .allowance {
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      li {
        cursor: pointer;
        background-color: $light-grey-color;
        @include sm-font;
        margin: 0;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding: 8px 15px;
        &.used {
          background-color: $warning-color;
        }
      }
    }
  }
}
.section-title {
  width: 50%;
  font-weight: 700;
  @include md-font;
  border-width: 0 0 1px 0;
  background-color: transparent !important;
}
</style>