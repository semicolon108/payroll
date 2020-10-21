import ConfirmParent from "@coms/Confirm/Parent";

const dialog = ConfirmParent

dialog.install = (Vue, options) => {
    Vue.prototype.$dialog = new (Vue.extend(ConfirmParent))({ propsData: options })
    Vue.dialog = Vue.prototype.$dialog
}

import Child from './Child'
dialog.components = {Child}



export default dialog