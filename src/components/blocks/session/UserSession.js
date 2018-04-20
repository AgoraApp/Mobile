import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text, FlatList } from 'react-native';
import moment from 'moment';

import { API_BASE_URL } from './../../../config/api';
import { MAIN_COLOR, COLOR_GREY, FONT_COLOR } from './../../../config/colors';
import sessionShape from './../../../config/shapes/sessionShape';

import { secondsToHoursAndMinutes } from './../../../helpers/generalHelpers';

import defaultAvatar from './../../../../assets/avatar_default_x2.png';

import Tag from './../Tag';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  userInfoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  avatarContainer: {
    marginRight: 15,
  },

  avatar: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
  },

  contentContainer: {
    alignItems: 'flex-start',
  },

  name: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },

  skillsContainer: {
    marginBottom: 10,
  },

  skillsTitle: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },

  skill: {
    marginRight: 5,
  },

  bottomContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },

  informationContainer: {
    marginBottom: 10,
    alignItems: 'flex-start',
  },

  informationTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

class UserSession extends React.PureComponent {
  getAvatar = () => {
    if (this.props.session.user.avatar.length > 0) {
      return { uri: `${API_BASE_URL}/${this.props.session.user.avatar}` };
    }

    return defaultAvatar;
  }

  renderSkill = ({ item }) => (
    <Tag
      style={styles.skill}
      text={item.name}
      color={COLOR_GREY}
      fontColor={FONT_COLOR}
      size="smaller"
    />
  )

  renderDuration() {
    const now = moment();
    const end = moment(this.props.session.end_at);

    const remainingDuration = end.diff(now, 'seconds');

    const { hours, minutes } = secondsToHoursAndMinutes(remainingDuration);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    if (hours > 0) {
      return formattedMinutes > 0 ? `${hours}h ${formattedMinutes}min` : `${hours}h`;
    }

    return formattedMinutes > 0 ? `${formattedMinutes}min` : '< 1min';
  }

  render() {
    const { session } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={this.getAvatar()}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.name}>{ session.user.first_name } { session.user.last_name }</Text>
            {
              session.user.expertise ?
                <Tag text={session.user.expertise.toUpperCase()} size="small" />
                : null
            }
          </View>
        </View>
        {
          session.user.skills.length > 0 ?
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Skills</Text>
              <FlatList
                data={session.user.skills}
                keyExtractor={item => item.id}
                renderItem={this.renderSkill}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            : null
        }
        <View style={styles.informationContainer}>
          <Text style={styles.informationTitle}>Zone</Text>
          <Tag text={session.zone.name} color={MAIN_COLOR} size="small" />
        </View>
        <View style={styles.informationContainer}>
          <Text style={styles.informationTitle}>Remaining duration</Text>
          <Tag text={this.renderDuration()} color={MAIN_COLOR} size="small" />
        </View>
      </View>
    );
  }
}

UserSession.propTypes = {
  session: PropTypes.shape(sessionShape).isRequired,
};

export default UserSession;
