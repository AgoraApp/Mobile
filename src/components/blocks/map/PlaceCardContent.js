import React from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView } from 'react-native';

import placeShape from './../../../config/shapes/placeShape';

class PlaceCardContent extends React.PureComponent {
  render() {
    const { place } = this.props;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text>
          Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior
          laudato consilio consensit in pacem ea ratione maxime percita, quod norat
          expeditionibus crebris fortunam eius in malis tantum civilibus vigilasse,
          cum autem bella moverentur externa, accidisse plerumque luctuosa, icto post
          haec foedere gentium ritu perfectaque sollemnitate imperator Mediolanum ad
          hiberna discessit. Cum autem commodis intervallata temporibus convivia longa
          et noxia coeperint apparari vel distributio sollemnium sportularum, anxia
          deliberatione tractatur an exceptis his quibus vicissitudo debetur,
          peregrinum invitari conveniet, et si digesto plene consilio id placuerit fieri,
          is adhibetur qui pro domibus excubat aurigarum aut artem tesserariam profitetur
          aut secretiora quaedam se nosse confingit. Exsistit autem hoc loco quaedam
          quaestio subdifficilis, num quando amici novi, digni amicitia, veteribus
          sint anteponendi, ut equis vetulis teneros anteponere solemus. Indigna
          homine dubitatio! Non enim debent esse amicitiarum sicut aliarum rerum
          satietates; veterrima quaeque, ut ea vina, quae vetustatem ferunt, esse
          debet suavissima; verumque illud est, quod dicitur, multos modios salis
          simul edendos esse, ut amicitiae munus expletum sit. Inter quos Paulus
          eminebat notarius ortus in Hispania, glabro quidam sub vultu latens,
          odorandi vias periculorum occultas perquam sagax. is in Brittanniam
          missus ut militares quosdam perduceret ausos conspirasse Magnentio,
          cum reniti non possent, iussa licentius supergressus fluminis modo
          fortunis conplurium sese repentinus infudit et ferebatur per strages
          multiplices ac ruinas, vinculis membra ingenuorum adfligens et quosdam
          obterens manicis, crimina scilicet multa consarcinando a veritate longe
          discreta. unde admissum est facinus impium, quod Constanti tempus
          nota inusserat sempiterna. { place.name }
        </Text>
      </ScrollView>
    );
  }
}

PlaceCardContent.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
};

export default PlaceCardContent;
