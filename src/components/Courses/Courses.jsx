import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../../contractABI";
import axios from "axios";
import SkeletonLoader from "./SkeletonLoader";
import { Toaster, toast } from "react-hot-toast";
import Confetti from "react-confetti";
import { getContract, getWalletClient } from "@wagmi/core";
import { useContractRead, useContractReads } from "wagmi";
import { LazyLoadComponent, LazyLoadImage } from "react-lazy-load-image-component";
import { getAllCourses } from "../../utils/PolybaseUtils";
import Course from "./Course/Course";
import CourseCard from "../CourseCard/CourseCard";
import { motion } from "framer-motion";
import { slideAnimateVariants } from "../animate/animate";
import calendar from "../../assets/calendar.png";
import gift from "../../assets/gift.png";

export default function Courses() {
  const [noOfCourses, setnoOfCourses] = useState(0);
  const [courseData, setcourseData] = useState([]);
  const [loader, setloader] = useState(true);

  const getCourseData = async () => {
    setloader(true);
    const data = await getAllCourses();
    let arr = [];
    data.forEach((d) => {
      arr.push(d.data);
    });
    setcourseData(arr);
    setloader(false);
  };

  useEffect(() => {
    getCourseData();
  }, []);

  // const WagmiContract = {
  //   address: contractAddress,
  //   abi: contractABI,
  // };

  // const {
  //   data: totalCourses,
  //   isError,
  //   isLoading: isTotalLoading,
  // } = useContractRead({
  //   ...WagmiContract,
  //   functionName: "totalCourses",
  // });

  // let arr = [];

  // for (let i = 0; i < Number(totalCourses); i++) {
  //   arr.push({ ...WagmiContract, functionName: "courses", args: [i] });
  // }
  // // console.log(arr);
  // const {
  //   data: courses,
  //   isCourseError,
  //   isLoading: isCourseLoading,
  //   isSuccess,
  // } = useContractReads({
  //   contracts: arr,
  //   watch: true,
  //   cacheTime: 5_000,
  //   onSuccess(data) {
  //     let dummyCourse = [];
  //     data.map(async (c) => {
  //       dummyCourse.push(c.result);
  //       setcourseData(dummyCourse);
  //       await getCourseMata();
  //     });
  //     setloader(false);
  //   },
  // });

  // const getCourseMata = async () => {
  //   let data = [];
  //   courseData.forEach(async (course, index) => {
  //     console.log(course[1]);
  //     const res = await axios.get(`https://decentraschool.infura-ipfs.io/ipfs/${course[1]}`);
  //     console.log(res.data);
  //     data[index] = [...course, res.data];
  //     console.log(data);
  //     setcourseData(data);
  //   });
  // };

  return (
    <div className="flex justify-center ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full">
        {/* <Header /> */}
        <main>
          <section className="px-10 flex flex-col gap-24 pb-20">
            <div className="">
              <div className="flex flex-col text-center p-8">
                <motion.h1
                  className="text-[1.5rem] md:text-2xl font-bold mb-5"
                  variants={slideAnimateVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{
                    once: true,
                  }}
                  custom={1}
                >
                  A broad selection of courses
                </motion.h1>
                <motion.p
                  className="hidden md:text-l md:block"
                  variants={slideAnimateVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{
                    once: true,
                  }}
                  custom={3}
                >
                  Intresting videos with all the information you need to get started in the world of web3 and blockchain
                </motion.p>
              </div>

              {loader && <SkeletonLoader></SkeletonLoader>}
              <div className="flex flex-wrap mb-10 md:container m-auto gap-8 align-middle md:content-center justify-center">
                {loader == false &&
                  courseData.map((course) => {
                    return (
                      // <div className="flex mb-5 gap-10 justify-center flex-row align-middle items-center flex-wrap">
                        <CourseCard
                          img={course?.imageurl}
                          title={course?.courseName}
                          desc={course.shortdesc}
                          course={course}
                        />
                      // </div>
                    );
                  })}
              </div>
              {/* <hr /> */}

              {/* <p>pagination</p> */}
              <div className="flex flex-col text-center p-8">
                <motion.h1
                  className="text-[1.5rem] md:text-[1.5rem] font-bold"
                  variants={slideAnimateVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{
                    once: true,
                  }}
                  custom={5}
                >
                  A broad to sucessful courses
                </motion.h1>
                <motion.p
                  className="hidden md:text-xl md:block"
                  variants={slideAnimateVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{
                    once: true,
                  }}
                  custom={8}
                >
                  maintain your daily streak and get rewards and compete with all your friends
                </motion.p>
              </div>

              <div className="ml-10 md:task-container md:flex md:justify-center md:gap-10">
                <div className="task p-5 rounded-lg shadow-lg flex flex-col bg-[#D9D9D9] w-[300px]  mb-10">
                  <img src={calendar} alt="" />
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold">Maintain Daily Streaks</p>
                    <p className="mt-3 mb-3 text-center whitespace-pre-wrap break-words">
                      Get ahead of your friends by maintaining daily streak
                    </p>
                  </div>
                </div>
                <div className="task p-5 rounded-lg shadow-lg flex flex-col bg-[#D9D9D9] w-[300px] mb-10">
                  <img src={gift} alt="" />
                  <div className="flex flex-col justify-center items-center">
                    <p style={{ fontWeight: "700" }}>Get Rewards</p>
                    <p
                      className="mt-3"
                      style={{
                        textAlign: "center",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      get rewards by maintaining the daily streak
                    </p>
                  </div>
                </div>
              </div>
              <motion.div
                className="enroll-btn-container"
                style={{ display: "flex", justifyContent: "center", width: "100%" }}
                variants={slideAnimateVariants}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
              >
                {/* <button
                  className="bg-[#f9a825] hover:bg-[#f5b44b]"
                  style={{ width: "300px", borderRadius: "40px", marginTop: "30px" }}
                >
                  Enroll Now
                </button> */}
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
