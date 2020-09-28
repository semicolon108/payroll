<template>
    <div>
        <div class="form-header">
            <div>
                <h3>Personal Document</h3>
                <button class="button is-primary" @click="modalClick = true">Add</button>
            </div>
            <p>Need help or have questions about uploading document? Call us at (856) 21 254709.</p>
        </div>
        <table class="table is-fullwidth" id="my-table">
            <thead>
                <tr>
                    <th>File Name</th>
                    <th>File</th>
                    <th class="is-md">Upload Date</th>
                    <th class="is-xs">Option</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i, idx) in docs" :key="idx">
                    <td>{{ i.name }}</td>
                    <td>
                        <a class="file" download :href="i.fileId.src">{{  i.fileId.name  }}</a>
                    </td>
                    <td>{{i.createdAt | formatDate}}</td>
                    <td>
                        <div class="icons">
<!--                            <span class="icon"><i class="fas fa-pen"></i></span>-->
                            <span @click="deleteDocument(i._id)" class="icon alert"><i class="fas fa-trash"></i></span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <addDocument @PushItem="pushItem" @CloseModal="CloseModal($event)" :modalClick="modalClick"/>
    </div>
</template>

<script>
import addDocument from "@coms/Employee/Modal/add-document";
import {deleteDocument, getDocuments} from "@/apis/document-api";
import moment from 'moment'

    export default {
        components:{
            addDocument,
        },
        data: () => ({
            modalClick: false,
            docs: []
        }),
      filters: {
        formatDate(date) {
          return moment(date).locale('lo').format('DD-MM-YYYY')
        }
      },
        methods:{
            CloseModal(newVal){
                this.modalClick = newVal
            },
            async getDocuments() {
                this.docs = await getDocuments(this.$route.params.id)
            },
          async deleteDocument(documentId) {
              const msg = await deleteDocument(documentId)
              if(msg==='Deleted') {
                const curIdx = this.docs.findIndex(i=>i._id === documentId)
                this.docs.splice(curIdx, 1)
              }
          },
          pushItem(item) {
              this.docs.push(item)
          }
        },
      created() {
          this.getDocuments()
      }
    }
</script>

<style lang="scss" scoped>
.form-header{
    div{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        h3{
            margin-bottom: 0;
        }
        button.is-primary{
            background-color: $sub-color;
            margin-left: 10px;
            border-radius: 0;
            &:hover{
                background-color: $sub-color;
                //color: $color;
            }
        }
    }
}

.file{
    cursor: pointer;
    color: $primary-color;
}
</style>