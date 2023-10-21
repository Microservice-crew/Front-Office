import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import CustomToggle from "../../components/dropdowns";
import ShareOffcanvas from "../../components/share-offcanvas";
import "../dashboard/Post/Post.css";

import img1 from "../../assets/images/small/07.png";
import icon2 from "../../assets/images/icon/02.png";
import loader from "../../assets/images/page-img/page-load-loader.gif";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../actions/uploadAction";
import { UilTimes } from "@iconscout/react-unicons";
import axios from "axios";
import jwt from "jwt-decode";

const Postes = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const token = JSON.parse(localStorage.getItem("myData")).token;
  const User = JSON.parse(localStorage.getItem("myData"));
  const [likes, setLikes] = useState(posts.likes);
  const [imagee, setImagee] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const userpicture = JSON.parse(localStorage.getItem("myData")).user.picture;
  const getUserByID = () => {
    if (token !== null) {
      const decoded_token = jwt(token);
      return decoded_token.id;
    }
  };
  const userId = getUserByID();

  const fetchUser = async (userId = User.user._id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/post/user/${userId}`
      );
      setUser(response.data);
    } catch (err) {
      setError(err.message);
    }
  };
  //fetchUser(posts.data)
  console.log("this is user fetching", User);

  console.log("this is id", User.user._id);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/post/`);
      setPosts(res.data.posts);
      setImagee(res.data.data.posts.image);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (postId, userId = User.user._id) => {
    try {
      const ID = userId;
      console.log("delete id ", ID);
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/post/${postId}`,
        {
          data: { userId: ID },
        }
      );
      if (response.status === 200) {
        alert("Post deleted");
        window.location.reload();
      } else {
        alert("Problem with the deletion of the POST");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("image list", imagee);

  const [info, setInfo] = useState();
  const handleLike = async (postId) => {
    const userId = User.user._id;
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/post/${postId}/like`,
        { userId }
      );
      setLikes({ likes: res.data });
      isLiked ? setIsLiked(false) : setIsLiked(true);
      setLikes({ status: isLiked });
      window.location.reload();
    } catch (err) {
      console.log(`error with like post ${err}`);
    }
  };

  const handleCreator = async (post) => {
    const userId = post.userId;
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/user/${userId}`
      );
      setInfo(res);
      return res;
    } catch (err) {
      console.log(`error with like post ${err}`);
    }
  };
  console.log(posts);
  const postHeader = (post) => {
    handleCreator(post);
    return (
      <img
        className="avatar-60 rounded-circle"
        src={`http://localhost:9000/data/${info?.picture}`}
        alt=""
      />
    );
  };
  //console.log(likes)
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  // Fetch all comments on component mount
  useEffect(() => {
    const fetchComments = async (postId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/post/${postId}/comments`
        );
        setComments({ data: response.data.comments });
      } catch (error) {
        console.error(error);
        setError("Failed to fetch comments");
      }
    };
    fetchComments();
  }, []);

  const handleAddComment = async (postId) => {
    console.log("postId is :", postId);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/post/${postId}/comment`,
        {
          user: User.user._id,
          fullName: User.user.fullName,
          comment: newComment,
        }
      );

      setComments([...comments, response.data.comment]);
      setPosts(
        posts.map((post) => (post._id === postId ? response.data : post))
      );
      setNewComment("");
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError("Failed to add comment");
    }
  };

  const loading = useSelector((state) => state.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const fullName = useRef();
  const dispatch = useDispatch();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: User.user._id,
      fullName: User.user.fullName,
      desc: desc.current.value,
      image,
    };

    dispatch(uploadPost(newPost));
    reset();
    fetchData();
  };
  return (
    <>
      <div id="content-page" className="content-page ">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="row m-0 p-0 ">
              <Col sm={12}>
                <Card
                  id="post-modal-data"
                  className="card-block card-stretch card-height"
                >
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Create Post</h4>
                    </div>
                  </div>
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="user-img">
                        <img
                          src={`http://localhost:9000/data/${userpicture}`}
                          alt="user1"
                          className="avatar-60 rounded-circle"
                        />
                      </div>
                      <form
                        enctype="multipart/form-data"
                        className="post-text ms-3 w-100 "
                        // onClick={handleShow}
                      >
                        <input
                          type="text"
                          className="form-control rounded"
                          placeholder="Write something here..."
                          style={{ border: "none" }}
                          ref={desc}
                          required
                        />

                        <ul className=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap w-100">
                          <li className="me-3 mb-md-0 mb-2 w-50">
                            <Link
                              to="#"
                              className="btn btn-soft-primary"
                              onClick={() => imageRef.current.click()}
                            >
                              <img
                                src={img1}
                                alt="icon"
                                className="img-fluid me-2"
                              />{" "}
                              Photo/Video
                            </Link>
                          </li>
                          <li className="me-3 mb-md-0 mb-2 ms-auto ">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                              onClick={handleSubmit}
                              disabled={loading}
                            >
                              {loading ? "Uploading..." : "Share"}
                            </button>
                            <div style={{ display: "none" }}>
                              <input
                                type="file"
                                name="myImage"
                                ref={imageRef}
                                onChange={onImageChange}
                              />
                            </div>
                          </li>
                          {image && (
                            <div className="previewImage">
                              <UilTimes onClick={() => setImage(null)} />
                              <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                              />
                            </div>
                          )}
                        </ul>
                      </form>
                    </div>
                    <hr></hr>
                  </Card.Body>
                </Card>
              </Col>

              {posts?.map((post) => (
                <Col sm={12} key={post.postId}>
                  <Card className=" card-block ">
                    <Card.Body>
                      <div className="user-post-data">
                        <div className="d-flex justify-content-between">
                          <div className="me-3">
                            {post.userId?.picture ? (
                              <img
                                className="avatar-60 rounded-circle"
                                src={`http://localhost:9000/data/${post.userId?.picture}`}
                                alt=""
                              />
                            ) : (
                              postHeader(post)
                            )}
                          </div>

                          <div className="w-100">
                            <div className="d-flex justify-content-between">
                              <div>
                                <h5 className="mb-0 d-inline-block">
                                  {post.fullName}
                                </h5>
                              </div>
                              <div className="card-post-toolbar">
                                <Dropdown>
                                  <Dropdown.Toggle variant="bg-transparent">
                                    <span className="material-symbols-outlined">
                                      more_horiz
                                    </span>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                    {User.user._id === post.userId ? (
                                      <Dropdown.Item
                                        className=" p-3 btn btn-danger"
                                        to="#"
                                        onClick={() => handleDelete(post._id)}
                                      >
                                        <div className="d-flex align-items-top">
                                          <div className="h4 material-symbols-outlined">
                                            <i className="ri-save-line"></i>
                                          </div>
                                          <div className="data ms-2">
                                            <h6>Delete Post</h6>
                                          </div>
                                        </div>
                                      </Dropdown.Item>
                                    ) : (
                                      <></>
                                    )}
                                    <Dropdown.Item className="p-3" to="#">
                                      <div className="d-flex align-items-top">
                                        <i className="ri-close-circle-line h4"></i>
                                        <div className="data ms-2">
                                          <h6>Hide Post</h6>
                                          <p className="mb-0">
                                            See fewer posts like this.
                                          </p>
                                        </div>
                                      </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item className=" p-3" to="#">
                                      <div className="d-flex align-items-top">
                                        <i className="ri-user-unfollow-line h4"></i>
                                        <div className="data ms-2">
                                          <h6>Unfollow User</h6>
                                          <p className="mb-0">
                                            Stop seeing posts but stay friends.
                                          </p>
                                        </div>
                                      </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item className=" p-3" to="#">
                                      <div className="d-flex align-items-top">
                                        <i className="ri-notification-line h4"></i>
                                        <div className="data ms-2">
                                          <h6>Notifications</h6>
                                          <p className="mb-0">
                                            Turn on notifications for this post
                                          </p>
                                        </div>
                                      </div>
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p>{post.desc}</p>
                      </div>
                      <div className="user-post justify-content-center">
                        <div className=" d-grid justify-content-center gap-3">
                          <img
                            width={300}
                            height={300}
                            className="img-fluid"
                            src={`http://localhost:9000/data/${post.image}`}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="comment-area mt-3">
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                          <div className="like-block position-relative d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="like-data">
                                <img
                                  onClick={() => handleLike(post._id)}
                                  src={icon2}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="total-like-block ms-2 me-3">
                                <Dropdown>
                                  <Dropdown.Toggle
                                    as={CustomToggle}
                                    id="post-option"
                                  >
                                    {/* { isLiked ? (
                                          <button onClick={handleLike} >{isLiked && "Dislike"}</button>
                                        ) : (
                                          <button onClick={handleLike}>{!isLiked && "Like"}</button>
                                        )} */}
                                    <p>{post.likes.length} Likes</p>
                                  </Dropdown.Toggle>
                                </Dropdown>
                              </div>
                            </div>
                            <div className="total-comment-block">
                              <Dropdown>
                                <Dropdown.Toggle
                                  as={CustomToggle}
                                  id="post-option"
                                >
                                  <p>{post.comments.length} Comments</p>
                                </Dropdown.Toggle>
                              </Dropdown>
                            </div>
                          </div>
                          <ShareOffcanvas />
                        </div>
                        <hr />
                        <ul className="post-comments list-inline p-0 m-0">
                          {post.comments.map((item, i) => (
                            <li>
                              <div className="d-flex">
                                <div className="user-img">
                                  <img
                                    key={i}
                                    src={`http://localhost:9000/data/${item?.user?.picture}`}
                                    alt="user1"
                                    className="avatar-35 rounded-circle img-fluid"
                                  />
                                </div>

                                <div
                                  className="comment-data-block ms-3"
                                  key={item.user}
                                >
                                  <h6>{item.fullName}</h6>
                                  <p className="mb-0">{item.comment}</p>
                                  <div className="d-flex flex-wrap align-items-center comment-activity">
                                    <Link to="#">Like</Link>
                                    <Link to="#">reply</Link>
                                    <span>5min</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <form className="comment-text d-flex align-items-center mt-3">
                          <input
                            type="text"
                            className="form-control rounded"
                            placeholder="Enter Your Comment"
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <div className="comment-attagement d-flex">
                            <Link to="#">
                              <i
                                className="ri-link me-3"
                                onClick={() => handleAddComment(post._id)}
                              >
                                {" "}
                              </i>
                            </Link>
                            {/* <Link to="#">
                            <i className="ri-user-smile-line me-3"></i>
                          </Link>
                          <Link to="#">
                            <i className="ri-camera-line me-3"></i>
                          </Link> */}
                          </div>
                        </form>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Col>

            <div className="col-sm-12 text-center">
              <img src={loader} alt="loader" style={{ height: "100px" }} />
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Postes;
