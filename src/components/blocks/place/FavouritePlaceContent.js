import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import placeShape from './../../../config/shapes/placeShape';

import CreateSessionButton from './../session/CreateSessionButton';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

class FavouritePlaceContent extends React.PureComponent {
  handlePress = () => {

  }

  render() {
    const { place } = this.props;

    return (
      <View style={styles.container}>
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
          debet suavissima;
        </Text>
        <CreateSessionButton place={place} />
      </View>
    );
  }
}

FavouritePlaceContent.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
};

export default FavouritePlaceContent;
