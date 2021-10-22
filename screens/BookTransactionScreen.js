import React from 'react';
import { Text, View,TouchableOpacity,StyleSheet } from 'react-native';
import * as Permissions from'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor(){
    super()
    this.state={
      hasCameraPermission:null,
      scanned:false,
      scannedData:"",
      buttonState:'normal'
    }
  } 
  getCameraPermissions=async()=>{
    const{status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission:status==="granted",
      scanned:false,
      scannedData:"hello i am ready to scan",
      buttonState:'clicked'
    })
  } 
  handleBarCodeScanned=async({type,data})=>{
    this.setState=({
      scannedData:data,
      scanned:true,
      buttonState:'normal'
    })
  }
  render() {
    const hasCameraPermissions=this.state.hasCameraPermission
    const scanned=this.state.scanned;
    const buttonState=this.state.buttonState;
    if(buttonState==="clicked" && hasCameraPermissions===true){ 
    return (
      <BarCodeScanner 
      onBarCodeScanned={scanned?'no data yet':this.handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}/>
        
      );
    }
    else if(buttonState==="normal"){
return(
        <View style={styles.container}>
          <Text style={styles.displayText}>{
            hasCameraPermissions?scannedData:"request camera Permission"
          }</Text>
          <TouchableOpacity 
          onPress={()=>this.getCameraPermissions()}
          style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}
  const styles=StyleSheet.create({
container:{
  flex: 1, 
  justifyContent: 'center',
   alignItems: 'center'
},
displayText:{
  fontSize:15,
  textDecorationLine:'underline'
},
scanButton:{
  backgroundColor:'red',
  padding:10,
  margin:10
},
buttonText:{
  fontSize:10,
  color:'black'
}

  })