import { useState, useContext } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";



const Update = ({ setOpenUpdate, user }) => {
    const [cover, setCover] = useState("");
    const [profile, setProfile] = useState("");

    const { currentUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const [texts, setTexts] = useState({
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        username: user.username,
        city: user.city,
        language: user.language,
        phone: user.phone
    });

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
    };

    const queryClient = useQueryClient();

    const mutationUpdateUser = useMutation(
        (user) => {
            return makeRequest.put("/users", user);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["users"]);
                window.location.reload(false);
            },
        }
    );

    const mutationUpdateUserPassword = useMutation(
        (user) => {
            return makeRequest.put("/users/password", user);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["users"]);
                window.location.reload(false);
            },
        }
    );


    const mutationDeleteUser = useMutation(
        (userId) => {
            return makeRequest.delete("/users/" + userId);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["users"]);
                navigate("/register");
            }
        }
    );

    const handleUpdate = async (e) => {
        e.preventDefault();

        let coverUrl;
        let profileUrl;
        coverUrl = cover ? await upload(cover) : user.coverPic;
        profileUrl = profile ? await upload(profile) : user.profilePic;

        if(texts.password === undefined && texts.confirmPassword === undefined){
            mutationUpdateUser.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
            setOpenUpdate(false);
            setCover(null);
            setProfile(null);

        }else{

            if(texts.password === undefined || texts.confirmPassword === undefined || texts.password[0] !== texts.confirmPassword[0]){
                alert("Las contraseñas no coinciden")
            }else{

                mutationUpdateUserPassword.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
                setOpenUpdate(false);
                setCover(null);
                setProfile(null);
            }
        }
    }


    const handleDelete = async (e) => {
        e.preventDefault();

        mutationDeleteUser.mutate(currentUser.id);
        setOpenUpdate(false);
    }


    return (
        <div className="update">
            <div className="container">
                <div className="wrapper">
                    <h1>Actualiza tu perfil de usuario</h1>
                    <form>
                        <div className="files">
                            <label htmlFor="cover">
                                <span>Imagen de fondo</span>
                                <div className="imgContainer">
                                    <CloudUploadIcon className="icon" />
                                </div>
                            </label>
                            <input
                                type="file"
                                id="cover"
                                style={{ display: "none" }}
                                onChange={(e) => setCover(e.target.files[0])}
                            />
                            <label htmlFor="profile">
                                <span>Imagen de perfil</span>
                                <div className="imgContainer">
                                    <CloudUploadIcon className="icon" />
                                </div>
                            </label>
                            <input
                                type="file"
                                id="profile"
                                style={{ display: "none" }}
                                onChange={(e) => setProfile(e.target.files[0])}
                            />
                        </div>
                        <label>Email</label>
                        <input
                            type="text"
                            value={texts.email}
                            name="email"
                            onChange={handleChange}
                        />
                        <label>Contraseña</label>
                        <input
                            type="text"
                            value={texts.password}
                            name="password"
                            onChange={handleChange}
                        />
                        <label>Repite la contraseña</label>
                        <input
                            type="text"
                            value={texts.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                        />

                        <label>Nombre de usuario</label>
                        <input
                            type="text"
                            value={texts.username}
                            name="username"
                            onChange={handleChange}
                        />
                        {/* <label>Country / City</label>
                        <input
                            type="text"
                            name="city"
                            value={texts.city}
                            onChange={handleChange}
                        /> */}
                        <label>Idiomas</label>
                        <input
                            type="text"
                            name="language"
                            value={texts.language}
                            onChange={handleChange}
                        />
                        <label>Número de contacto</label>
                        <input
                            type="text"
                            name="phone"
                            value={texts.phone}
                            onChange={handleChange}
                        />
                        <button className="button-29-purple" onClick={handleUpdate}>Actualizar</button>
                        <button className="button-29-red" onClick={handleDelete}>Eliminar</button>                    
                    </form>
                    <button className="close" onClick={() => setOpenUpdate(false)}>&nbsp; X &nbsp; </button>
                </div>
            </div>
        </div>
    );
};

export default Update;
