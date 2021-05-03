import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ResultPage } from '../result/result.page';
import { CoseVerifierService } from '../../services/cose-verifier.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public ISSUER: number = 1;
  public SUBJECT: number = 2;
  public AUDIENCE: number = 3;
  public EXPIRATION: number = 4;
  public NOT_BEFORE: number = 5;
  public ISSUED_AT: number = 6;
  public CWT_ID: number = 7;

  public HCERT: number = -260;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private verifier: CoseVerifierService
  ) {}

  scanCertif() {
    console.log('scanCertif');

    var self = this;

    this.barcodeScanner.scan({
      formats: "QR_CODE"
    }).then(barcodeData => {
      console.log('Barcode data', barcodeData);

      /*var barcodeData = {
        
        // https://github.com/ehn-digital-green-development/ehn-dgc-schema/blob/main/examples/vac.json
        //'text': 'HC1:6BF690-70T9WTWGSLKC 4P99Q-SBKQ7RGZUVFBB8 8-CC9JCWZAIQ62ACX$L1DC2F33FH 8O5W5C%63IKIC6$PC5$CUZCY$5Y$5TPCBEC7ZKW.C$$EE/44LEJXOF/D234U44CECT34AEC1$C JCA/DY+8CEC2XO 3EAPEKI9CECLPCG/DGEERB8.NAQ+9BS7NB8.R7LB8CY8MPCG/DT D.HAA+921ANNAXH9NB8JPCT3E6JD646CA78465W5X577:EDOL9WEQDD+Q6TW6FA7C466KCN9E%961A6DL6FA7D46.JCP9EJY8L/5M/5546.96VF6.JCBECB1A-:8$966469L6OF6VX6FVCPD0KQEPD0LVC6JD846Y96A465W5.A6UPCBJCOT9+EDT8FHZ95/D QEALEN44:+CW7A-JCOEDT34X C:VDS7D:34: CJ.CZKE9440/D+34S9E5LEWJC0FD4X4:KEPH7M/ESDD746VG7TS9N7A1B8MZAHNA356TR6/IBV+AYT9Z%6ZB827BNEMQMOIPLJ7F806W1FEQR9Z4/YOSKS-WS-WHGGOOWJ9$0F18UM9B1T-+DY39$15 -TSFAS5T8T5%E6/6N.17V+G2.QVLK$FSW$8K:I'

        // Non-existant vp code 1119349000
        //'text': 'HC1:6BF690-70T9WTWGSLKC 4P99Q-SBKQ7RGZUVFBB8 8-CC9JCWZAIQ62ACX$L1DC2F33FH 8O5W5C%63IKIC6$PC5$CUZCY$5Y$5TPCBEC7ZKW.C$$EE/44LEJXOF/D234U44CECT34AEC1$C JCA/DY+8CEC2XO 3EAPEKI9CECLPCG/DGEERB8.NAQ+9BS7NB8.R7LB8CY8MPCG/DT D.HAA+921ANNAXH9NB8JPCT3E6JD646CA78465W5X577:EDOL9WEQDD+Q6TW6FA7C466KCN9E%961A6DL6FA7646.JCP9EJY8L/5M/5546.96VF6.JCBECB1A-:8$966469L6OF6VX6FVCPD0KQEPD0LVC6JD846Y96A465W5.A6UPCBJCOT9+EDT8FHZ95/D QEALEN44:+CW7A-JCOEDT34X C:VDS7D:34: CJ.CZKE9440/D+34S9E5LEWJC0FD4X4:KEPH7M/ESDD746VG7TS9N7A1B8MZAHNA356TR6/IBV+AYT9Z%6ZB827B0LDOPNLA6DF8I*MIWT+ZHNP7%8V3-4WAMQIHG9V6:KNJVCOV*0KG.E/EE-9BFTP:TAC/N7-RW1WJPD:OL3CN.IN*W8IJ5 B55VMNLJ'

        // https://github.com/ehn-digital-green-development/ehn-dgc-schema/blob/main/examples/test-rat.json
        //'text': 'HC1:6BFA$B/8OAP2/20+919HH%FO839JKL8GU IJCXRW8UXK5PWBTZL/UMA%S:4W*84LWM.9TWSFCG7%SFPZI+ 8DJ8W%MH8F1NH 41T9G6KH9J3/ 9E4N%12*6CDZ2KJQ+ZL50C21OMDSE:NNCMDLEU-Q1LV%3UFTT9.KG-120I2K04KN :H 0PXDTU:E5 BM3OCUDOCGP%8+73ZAHACL9T7H*4.8ASP7HJI:JGQVAYVOV$IA31HR9I8J.KKTX3FG3JLL+WS%1L**7MH99QPKUJ1VHE4L*0M2FAC5TTDUU/5XQPVL3.*QM27H M5YUDTT274WJ5%GK.Q8 KI-O637KQXQWT2G 9:RLHOR8AJ47MMGUZ1MO9CRJ3ZYUU%2TF82MUTI1U85-1KZ6WXJGY1HTNG-UF0NB4A8FG8.NQ.*SN8WVJB89IQBARVVPLN.FBNIQUDDJ%RLZ40B85ZHE99 LBYKSAOSF9PAQRRW5FW43WK8A8ZFG 6P.U0TL8XRJ:W4$+7 M4JP8*RA5RRNK2/ENT4WES9425R91KTN8BS0NE0TCHRA/KC+/B586 V868U ER-$NP:H-2S2CASGN.SFM-N9J5R7T J42 1XLL37E1G5+3S$2S$NNJ7G1LFG8D%8WU5GZ$1BZ4PTT/1B3BNMVK GJ +60QK'

        // https://github.com/ehn-digital-green-development/ehn-dgc-schema/blob/main/examples/contrived-translit.json
        //'text': 'HC1:6BFOXN%TSMAHN-H1$S/UI%-25VJ .F-AHPXH+MIZEJNL2I7DP-IHGCM6W+N6UWG7RVHC5M+8HY0HI2$4JV7J$%25I3HC3183/9TL4TSH9TXPD76OMML4PJRJED16RK/2P3+GI+LL2RXNUC522%9B2P8EI40Q5N3-V2PT51MR:NCLAA 2LO%B1FD/U4CPLE.9.%6Y2I:A8O6O$%355O+0MW+6O-90*6Y2IC:H02KG+6-%7.C8EEAHJP7NV*CBVZ0C%0VZ0VONH1JW$C2VLTK96L6SR9MU9DV5 R13PI%F1PN1/T1%%HN9G2 UK*R3T3+7A.N88J4R$F/MAITH-+R2YBV44PZB6H0CJ0%H0%P8C K1U70%KLR2C KRF2IJLCNNE+49-8YE97NV5LOVD98-OM:C4IJZJJ1W4*$I*NV-B1D+KUC7VIPJ*3TFH2V4LC1H684RT -RVFNGB1NHH :6AI8K*MB6PPJ3ZY6WLIML5YO9OUUMK9WLIK*L5R1G-VOXL7JELW5BWOM-PDNK7NGXH43R33NE9$R2SK1Q3R*TO38N+TOOEBDQ7Q7VAM.-A/:6V6P*ZSYRPY:V13F0CSTZF8BB$PD/XQNSEOBNKX6-3MU7RCGJ6+CA26MHU:CHZ9SOLPB.4B+8WQU BP2%M'

        // https://github.com/ehn-digital-green-development/ehn-dgc-schema/blob/main/test/invalid/missing_dob.json
        //'text': 'HC1:6BF 80B80T9WTWGSLKC 4P99Q-SBKQ7RGZUVFBB%+6-CC9JCWZAIQ62ACX$L1DC2F33FH 8O5W5C%63IKHC6$PC5$CUZCY$5Y$5TPCBEC7ZKW.C$$EE/44LEJXOF/D234U44CECT34AEC1$C JCA/DY+8CEC2XO 3EAPEKI9CECLPCG/DGEERB8.NAQ+9BS7NB8.R7LB8CY8MPCG/DT D.HAA+921ANNAXH9NB8KECTHG4KCD3DX47B46IL6646H*6Z/E5JD%96IA74R6646307Q$D.UDRYA 96NF6L/5SW6Y57B$D% D3IA4W5646946846.96XJC$+D3KC.SCXJCCWENF6OF63W5$Q6OF6WJCT3EJ+9%JC+QE1R5ZED+EDKWE3EFX3E$34Z$EXVD-NC%69AECAWE1Q582BUVDGECDZCCECRTCUOA04E4WEOPCM8F6%E3.DA%EOPC1G72A6J+9XG7%UDL57Z1BC%67IBMIAO7BLB8RUDG09/IBO88:M00X9TUBTMJXH8:HAZZ2 .2YB9-2LM/PUTNMWQ:ALWJRPRHW89*A3T HRFU  43YE$639RMPN7OPQD%9N3GDX7QDI$Z67IF1IIS0'
              
        // https://github.com/ehn-digital-green-development/ehn-dgc-schema/blob/main/test/invalid/missing_fnt.json
        //'text': 'HC1:6BFB80 80T9WTWGSLKC 4P99Q-SBKQ7RGZUVFBBSX3-CC9JCWZAIQ62ACX$L1DC2F33FH 8O5W5C%63IKIC6$PC5$CUZCY$5Y$5TPCBECZNKW.C$$EE/44LEJXOF/D234U44CECT34AEC1$C JCA/DY+8CEC2XO 3EAPEKI9CECJPCT3E6JD646CA78465W5X577:EDOL9WEQDD+Q6TW6FA7C466KCN9E%961A6DL6FA7D46.JCP9EJY8L/5M/5546.96VF6.JCBECB1A-:8$966469L6OF6VX6FVCPD0KQEPD0LVC6JD846Y96A465W5.A6UPCBJCOT9+EDT8FHZ95/D QEALEN44:+CW7A-JCOEDT34X C:VDS7D:34: CJ.CZKE9440/D+34S9E5LEWJC0FD4X4:KEPH7M/ESDD746VG7TS9N7A1B8MZAHNA356TR6/IBV+AYT9Z%6ZB827BA4L29S73G93R9I7QQDB99RO9JPS-9U$I3K+Q%AWPQTX17GHVUQUTFC43DQRPV:A+ZLU%4/CPZ+52VM0PHNFAP1Q74LE2GKJCTKVRRH'
                
        // https://github.com/ehn-digital-green-development/ehn-dgc-schema/blob/main/test/invalid/invalid_vac.json
        //'text': 'HC1:6BF$80A80T9WTWGSLKC 4P99Q-SBKQ7RGZUVFBBO17-CC9JCWZAIQ62ACX$L1DC2F33FH 8O5W5C%63IKIC6$PC5$CUZCY$5Y$5TPCBEC7ZKW.C$$EE/44LEJXOF/D234U44CECT34AEC1$C JCA/DY+8CEC2XO 3EAPEKI9CECLPCG/DGEERB8.NAQ+9BS7NB8.R7LB8CY8MPCG/DT D.HAA+921ANNAXH9NB8JPCT3E6JD646CA78465W5X577:ERIL9WEQDD+Q6TW6FA7C466KCN9E%961A6DL6FA7D46.JCP9EJY8L/5M/5546.96VF6.JCBECB1A-:8$966469L6OF6VX6FVCPD0KQEPD0UPCBJCOT9+EDT8FHZ95/D QEALEN44:+CW7A-JCOEDT34X C:VDS7D:34: CJ.CZKE9440/D+34S9E5LEWJC0FD4X4:KEPH7M/ESDD746VG7TS9N7A1B8MZAHNA356TR6/IBV+AYT9Z%6ZB827B A9TDCT48CAHR1T4FKZQIMU47*EG%6WH2$PTM.UW TDDVODC*H93.AF3AZ9WK5T492UIBDAR8VTRPTBFJ5+QEN6GX4$OP$CT6:0RVI'
      }*/

      try {
        let cwtHeader = this.verifier.getCwtHeaderData(barcodeData.text);

        console.log('Issuer: ' + cwtHeader[this.ISSUER]);
        console.log('Subject: ' + cwtHeader[this.SUBJECT]);
        console.log('Audience: ' + cwtHeader[this.AUDIENCE]);
        console.log('Expiration: ' + cwtHeader[this.EXPIRATION]);

        console.log('Hcert: ');
        console.log(cwtHeader[this.HCERT][1]);

        this.verifier.verify(barcodeData.text).then(function (json) {
          console.log(json);
          let hcert = json[self.HCERT][1];
          let status = 'success';
          let result = self.verifier.validateSchema(hcert);
          let messages = [];
          if (result.errors.length > 0) {
            for (let error of result.errors) {
              console.log(error.stack);
              messages.push(error.stack);
              status = 'warning';
            }
          }
          console.log(hcert);
          self.presentResults(hcert, status, messages);
        }).catch((error) => {
          console.log(error);
          let hcert = cwtHeader[self.HCERT][1];
          console.log(hcert);
          self.presentResults(hcert, 'error', [error.message]);
        });
      } catch (error) {
        this.presentAlert(error);
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }

  async presentResults(data: object, status: string, messages?: string[]) {
    const modal = await this.modalController.create({
      component: ResultPage,
      componentProps: {
        data: data,
        status: status,
        messages: messages
      }
    });
    return await modal.present();
  }

  async presentAlert(error: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Invalid barcode',
      message: error,
      buttons: ['OK']
    });
    return await alert.present();
  }

  dismiss() {
    console.log('dismiss from home');
  }
}
