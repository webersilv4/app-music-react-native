import { StyleSheet } from "react-native";


const colorDft = '#C7AF9E';

const styles = StyleSheet.create({

  /***
   * NavGation
   */
  navigation: {
    flexDirection:'row',
    justifyContent: 'space-around',
    backgroundColor: colorDft,
    borderTopWidth: 1,
    marginBottom: 45,
    padding: 10
  },
  
  container: {
    flex: 1,
    backgroundColor: colorDft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // TITULOS E SUBTITULOS
  text: {
    color: '#fff'
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },

  subTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'normal'
  },

  // FINAL DOS TEXTOS


  // DISPLAYS
  displayFlexBetween: {
    flexDirection:'row', 
    flexWrap:'wrap', 
    justifyContent: 'space-between'
  },

  displayFlexEnd: {
    flexDirection:'row', 
    flexWrap:'wrap', 
    justifyContent: 'flex-end'
  },

  displayFlexCenter: {
    flexDirection:'row', 
    flexWrap:'wrap', 
    justifyContent: 'center'
  },

  displayFlexStart: {
    flexDirection:'row', 
    flexWrap:'wrap', 
    justifyContent: 'flex-start'
  },

  // Imagens
  imageAlbum: {
    width: 'auto',
    height: 300,
    borderRadius: 5,
    marginBottom: 10
  },

  imagesList: {
    width: 300,
    height: 300
  },



  // Margins
  mb100: {
    marginBottom: 100
  },

});

export default styles;