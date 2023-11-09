<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>directions_boat</md-icon>
          </div>
          <h4 class="title">Draft Information</h4>
        </md-card-header>
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>N° Container</label>
                <md-input v-model="draft.input1" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>N° Lacre</label>
                <md-input v-model="draft.input2" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Tara</label>
                <md-input v-model="draft.input3" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Peso</label>
                <md-input v-model="draft.input4" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>NCM Produto</label>
                <md-input v-model="draft.input5" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Descrição produto</label>
                <md-input v-model="draft.input6" type="text"></md-input>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <!-- <md-card-actions md-alignment="left">
          <md-button class="md-success">Submit</md-button>
        </md-card-actions> -->
      </md-card>
    </div>
    <div class="md-layout-item md-small-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>settings</md-icon>
          </div>
          <h4 class="title">Actions</h4>
        </md-card-header>

        <md-card-actions md-alignment="left">
          <input id="fileUpload" type="file" hidden @change="ValidateDraft" />
          <md-button class="md-success" @click="chooseFiles()">Validate master</md-button>
          <md-button class="md-default" disabled>Send Booking</md-button>
          <md-button class="md-default" disabled>Send Draft</md-button>
          <md-button class="md-default" disabled>Confirm Boarding</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>
<script>

import { BillOfLadingService } from "../../../api-services/billOfLadingService";
import Swal from "sweetalert2";

export default {
  components: {},
  data() {
    return {
      draft: {
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: ''
      }
    };
  },
  async mounted() {
    // if (this.$cookie.get("tipoUsuario") != "Administrador") {
    //   this.$router.push("/login");
    // }

    this.draft = this.$route.params.item;

    if (!this.draft) {
      this.draft = {
        id: 0,
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
      };
    }
    // if (item != undefined) {
    //   this.acao = "Atualizar";
    //   this.loja = await LojaService.Buscar(item.id);
    // }

    // this.status = await StatusService.Listar();
  },
  methods: {
    chooseFiles() {
      document.getElementById("fileUpload").click();
    },

    async ValidateDraft(event) {

      if (!this.draft.input1 ||
        !this.draft.input2 ||
        !this.draft.input3 ||
        !this.draft.input4 ||
        !this.draft.input5 ||
        !this.draft.input6) {
        Swal.fire({
          title: "Preencha todas as informações do Draft",
          buttonsStyling: true,
          confirmButtonClass: "md-button md-warning",
        });
      data.append(event.target.files[0], null);
        return;
      }
      else {
        var data = new FormData();
        data.append(event.target.files[0], event.target.files[0]);

        const response = await BillOfLadingService.ValidateDraft(data);
        var pdfContent = response.data;


        // var teste = pdfContent.includes(this.draft.input1);
        // console.log(teste);
        // console.log("Input 1: " + pdfContent.includes(this.draft.input1));
        // console.log("Input 2: " + pdfContent.includes(this.draft.input2));
        // console.log("Input 3: " + pdfContent.includes(this.draft.input3));
        // console.log("Input 4: " + pdfContent.includes(this.draft.input4));
        // console.log("Input 5: " + pdfContent.includes(this.draft.input5));
        // console.log("Input 6: " + pdfContent.includes(this.draft.input6));


        // console.log("--------------");
        // console.log(pdfContent);

        if (pdfContent.includes(this.draft.input1) &&
          pdfContent.includes(this.draft.input2) &&
          pdfContent.includes(this.draft.input3) &&
          pdfContent.includes(this.draft.input4) &&
          pdfContent.includes(this.draft.input5) &&
          pdfContent.includes(this.draft.input6)) {
          Swal.fire({
            title: "O PDF anexado está de acordo 100%",
            buttonsStyling: true,
            confirmButtonClass: "md-button md-info",
          });
        }
        else {



          Swal.fire({
            title: "O PDF anexado está de diferente do cadastrado",
            buttonsStyling: true,
            confirmButtonClass: "md-button md-info",
          });
        }
      }
      data.append(event.target.files[0], null);
      return;
      // this.produto.notaFiscal = response.data;
    },
  }

};
</script>
<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}

.md-inline-checkboxes {
  display: inline-flex;

  .md-checkbox {
    margin-top: 15px !important;
  }
}

.md-checkbox,
.md-radio {
  margin-top: 15px;
  margin-bottom: 0.5rem;
}

.md-checkbox,
.md-radio {
  display: flex;
}

.md-radio .md-radio-container {
  margin-left: 5px;
  position: relative;
  left: -3px;
}

.md-form-label+.md-layout-item .md-checkbox:not(:first-child),
.md-form-label+.md-layout-item+.md-layout-item .md-radio:not(:first-child),
.md-form-label+.md-layout-item .md-radio {
  margin-top: 0;
}

.form-control-static {
  margin-top: 6px;
}
</style>
