import { StatusBar } from 'expo-status-bar';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState, useRef } from 'react';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'

export default function CameraProntuario({ route, navigation }) {

    const cameraRef = useRef(null)
    const [photo, setPhoto] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [tipoCamera, setTipoCamera] = useState('back');
    const [latestPhoto, setLatestPhoto] = useState(null);

    const [permission, requestPermission] = useCameraPermissions();
    const [permissionMedia, requestMediaPermission] = MediaLibrary.usePermissions()

    useEffect(() => {
        (async () => {
            if (permission && !permission.granted) {
                await requestPermission();
            }

            // const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync()
            if( MediaLibrary.PermissionStatus.DENIED ){
                await requestMediaPermission();
            }
        })();
    }, []);

    useEffect(() => {
        GetLastPhoto();
    }, [])

    function toggleCameraFacing(){
        setTipoCamera(current => (current === 'back' ? 'front' : 'back'))
    }

    async function CapturePhoto() {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync()
            setPhoto(photo.uri)

            setOpenModal(true)
        }
    }

    async function GetLastPhoto(){
        const { assets } = await MediaLibrary.getAssetsAsync({ sortBy : [[ MediaLibrary.SortBy.creationTime, false]], first : 1 });
        
        if(assets.length > 0 ){
            setLatestPhoto( assets[0].uri )
        }
    }

    //navigation.replace("Home", {uriPhoto : uri, screen : "Perfil"})
    
    async function UploadPhoto() {
        setOpenModal(false)

        if (route.params.screen == "Perfil") {
            await navigation.navigate('Perfil', { photoUri: photo });
        } else {
            await navigation.navigate('ProntuarioPronto', { photoUri: photo });

        }
    }

    async function SelectImageGallery(){
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            quality : 1
        });

        if(!result.canceled){
            setPhoto(result.assets[0].uri)

            setOpenModal(true)
        }
    }

    function ClearPhoto() {
        setPhoto(null)

        setOpenModal(false)
    }

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={tipoCamera}
                ratio='16:9'
            >
                <View>
                    <TouchableOpacity style={styles.btnFlip}
                        // onPress={() => setTipoCamera(tipoCamera == CameraType.front ? CameraType.back : CameraType.front)}
                        onPress={toggleCameraFacing}
                    >
                        <Text style={styles.txtFlip}>Trocar</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
            <View style={styles.viewOptions}>
                <TouchableOpacity onPress={toggleCameraFacing}>
                    <MaterialCommunityIcons name='camera-retake' size={30} color="black"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnCapture} onPress={() => CapturePhoto()}>
                    <FontAwesome name='camera' size={23} color='#fff' />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => SelectImageGallery()}>
                    {
                        latestPhoto && (
                            <Image
                                style={{ width : 50, height : 50, borderRadius : 10 }}
                                source={{ uri : latestPhoto }}
                            />
                        )
                    }
                </TouchableOpacity>
            </View>

            <Modal animationType='slide' transparent={false} visible={openModal}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                    <View style={{ margin: 10, flexDirection: 'row' }}>
                        {/* Botoes de controle */}
                        <TouchableOpacity style={styles.btnClear} onPress={() => ClearPhoto()}>
                            <FontAwesome name='trash' size={35} color='#ff0000' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnUpload} onPress={() => UploadPhoto()}>
                            <FontAwesome name='upload' size={35} color='#121212' />
                        </TouchableOpacity>
                    </View>
                    <Image
                        style={{ width: '100%', height: 500, borderRadius: 15 }}
                        source={{ uri: photo }}
                    />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        height: '80%',
        width: '100%'
    },
    viewFlip: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    btnFlip: {
        padding: 20
    },
    txtFlip: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20
    },
    btnCapture: {
        padding: 20,
        margin: 20,
        width : 80,
        borderRadius: 10,
        backgroundColor: "#121212",
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnClear: {
        padding: 20,
        backgroundColor: "transparent",

        justifyContent: 'center',
        alignItems: 'center'
    },
    btnUpload: {
        padding: 20,
        backgroundColor: "transparent",

        justifyContent: 'center',
        alignItems: 'center'
    },
    viewOptions : {
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    }
});
