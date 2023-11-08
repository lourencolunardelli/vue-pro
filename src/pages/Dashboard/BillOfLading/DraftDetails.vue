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
      const data = new FormData();
      data.append("arquivo", event.target.files[0]);

      const response = await BillOfLadingService.ValidateDraft(data);
      var pdfContent = response.data;

      if (pdfContent.match(this.draft.input1) &&
        pdfContent.match(this.draft.input2) &&
        pdfContent.match(this.draft.input3) &&
        pdfContent.match(this.draft.input4) &&
        pdfContent.match(this.draft.input5) &&
        pdfContent.match(this.draft.input6)) {
        Swal.fire({
          title: "O PDF anexado está de acordo 100%",
          buttonsStyling: false,
          confirmButtonClass: "md-button md-info",
        });
      }
      else {
        Swal.fire({
          title: "O pdf anexado está de diferente do cadastrado",
          buttonsStyling: false,
          confirmButtonClass: "md-button md-info",
        });
      }

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
