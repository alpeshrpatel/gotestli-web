import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ExamInstructions from "@/components/quiz/examInstructions/ExamInstructions";
import { API } from "@/utils/AxiosInstance";

export default function CourceCard({ data, index }) {
  const [rating, setRating] = useState([]);
  const [questionSet, setQuestionsSet] = useState([]);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    async function getQuestionsSet() {
      try {
        const response = await API.get(`/question_sets/${data.id}`);
        setQuestionsSet(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getQuestionsSet();
  }, []);
  console.log(questionSet);
  return (
    <div className="col-lg-3 col-md-6">
      <div>
        <div className="coursesCard -type-1">
          <Modal open={open} onClose={onCloseModal} center>
            <ExamInstructions
              id={data.id}
              time={data.time_duration}
              questionSet={questionSet}
            />
          </Modal>
          <div className="relative">
            <div
              className="coursesCard__image overflow-hidden rounded-8 pointer "
              onClick={onOpenModal}
            >
              <img
                style={{ height: "225px", width: "350px" }}
                className="w-1/1"
                src={data.image}
                alt="image"
              />
              <div className="coursesCard__image_overlay rounded-8"></div>
            </div>
            {data.popular && (
              <div className="d-flex justify-between py-10 px-10 absolute-full-center z-3">
                <div>
                  <div className="px-15 rounded-200 bg-purple-1">
                    <span className="text-11 lh-1 uppercase fw-500 text-white">
                      Popular
                    </span>
                  </div>
                </div>

                <div>
                  <div className="px-15 rounded-200 bg-green-1">
                    <span className="text-11 lh-1 uppercase fw-500 text-dark-1">
                      Best sellers
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="d-flex justify-between py-10 px-10 absolute-full-center z-3"></div>
          </div>

          <div className="h-100 pt-15">
            {/* <div className="d-flex items-center">
              <div className="text-14 lh-1 text-yellow-1 mr-10">
                {data.rating}
              </div>
              <div className="d-flex x-gap-5 items-center">
                {rating.map((itm, i) => (
                  <div key={i} className="icon-star text-9 text-yellow-1"></div>
                ))}
              </div>
              <div className="text-13 lh-1 ml-10">({data.ratingCount})</div>
            </div> */}

            <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
              <button onClick={onOpenModal}>{data.title}</button>
            </div>

            <div className="d-flex x-gap-10 items-center pt-10">
              <div className="d-flex items-center">
                <div className="mr-8">
                  <img src="assets/img/coursesCards/icons/1.svg" alt="icon" />
                </div>
                <div className="text-14 lh-1">
                  {data.no_of_question} Questions
                </div>
              </div>

              <div className="d-flex items-center">
                <div className="mr-8">
                  <img src="assets/img/coursesCards/icons/2.svg" alt="icon" />
                </div>
                <div className="text-14 lh-1">{`${data.time_duration}m`}</div>
              </div>

              <div className="d-flex items-center">
                <div className="mr-8">
                  <img src="assets/img/coursesCards/icons/3.svg" alt="icon" />
                </div>
                <div className="text-14 lh-1">{data.level}</div>
              </div>
            </div>

            <div className="coursesCard-footer">
              <div className="coursesCard-footer__author">
                <span className="text-sm text-black-50">Created by</span>
                <div>{data.author}</div>
              </div>

              <div className="coursesCard-footer__price">
                {data.paid ? (
                  <>
                    <div>${data.originalPrice}</div>
                    <div>${data.discountedPrice}</div>
                  </>
                ) : (
                  <>
                    <div></div>
                    <div>Free</div>
                  </>
                )}
              </div>
            </div>
            <div>
              <p className="text-muted mt-4 d-flex align-items-center  text-justify">
                {data.short_desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
