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
            <div class="md-layout-item md-small-size-100 md-size-25">
              <md-field>
                <label>Number</label>
                <md-input v-model="draft.number" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Shipper</label>
                <md-input v-model="draft.shipper" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Consignee</label>
                <md-input v-model="draft.consignee" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Origin</label>
                <md-input v-model="draft.origin" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Destiny</label>
                <md-input v-model="draft.destiny" type="text"></md-input>
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
        number: '',
        shipper: '',
        consignee: '',
        origin: '',
        destiny: ''
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

      if (pdfContent.match(this.draft.number) &&
        pdfContent.match(this.draft.shipper) &&
        pdfContent.match(this.draft.consignee) &&
        pdfContent.match(this.draft.origin) &&
        pdfContent.match(this.draft.destiny)) {
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
