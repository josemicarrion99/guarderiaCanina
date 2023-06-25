import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { confirmAlert } from 'react-confirm-alert';
import { Link, useNavigate } from "react-router-dom";


const Update = ({ setOpenUpdate, user }) => {
    const [cover, setCover] = useState("");
    const [profile, setProfile] = useState("");

    const navigate = useNavigate();

    const [texts, setTexts] = useState({
        email: user.email,
        password: user.password,
        name: user.name,
        city: user.city,
        website: user.website,
    });

    const upload = async (file) => {
        console.log(file)
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

    const mutationDeleteUser = useMutation(
        (user) => {
            return makeRequest.delete("/users", user);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["users"]);
                navigate("/register");
            }
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();

        let coverUrl;
        let profileUrl;
        coverUrl = cover ? await upload(cover) : user.coverPic;
        profileUrl = profile ? await upload(profile) : user.profilePic;

        console.log(coverUrl);
        console.log(profileUrl);

        mutationUpdateUser.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
        setOpenUpdate(false);
        setCover(null);
        setProfile(null);
    }

    // const handleDelete = async (e) => {

    //     mutationDeleteUser.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    // }

    const handleDelete = async (e) => {
        e.preventDefault();

        let coverUrl;
        let profileUrl;
        coverUrl = cover ? await upload(cover) : user.coverPic;
        profileUrl = profile ? await upload(profile) : user.profilePic;

        console.log(coverUrl);
        console.log(profileUrl);

        mutationDeleteUser.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
        setOpenUpdate(false);
        setCover(null);
        setProfile(null);
    }


    return (
        <div className="update">
            <div className="container">
                <div className="wrapper">
                    <h1>Actualiza tu perfil de usuario</h1>
                    <form>
                        <div className="files">
                            <label htmlFor="cover">
                                <span>Cover Picture</span>
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
                                <span>Profile Picture</span>
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
                        <label>Password</label>
                        <input
                            type="text"
                            value={texts.password}
                            name="password"
                            onChange={handleChange}
                        />
                        <label>Name</label>
                        <input
                            type="text"
                            value={texts.name}
                            name="name"
                            onChange={handleChange}
                        />
                        <label>Country / City</label>
                        <input
                            type="text"
                            name="city"
                            value={texts.city}
                            onChange={handleChange}
                        />
                        <label>Website</label>
                        <input
                            type="text"
                            name="website"
                            value={texts.website}
                            onChange={handleChange}
                        />
                        <button onClick={handleClick}>Actualizar</button>
                        <button onClick={handleDelete}>Eliminar</button>                    
                    </form>
                    <button className="close" onClick={() => setOpenUpdate(false)}>&nbsp; X &nbsp; </button>
                </div>
            </div>
        </div>
    );
};

export default Update;
