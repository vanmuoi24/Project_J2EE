import React from "react";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  YoutubeFilled,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Container from "@/components/Share/Container";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-grid">
          {/* 1. Logo + Intro */}
          <div className="footer-col">
            <h2 className="footer-logo">TravelVN</h2>
            <p>
              Explore Vietnam and beyond with our carefully curated tours,
              last-minute deals, and unforgettable experiences.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Destinations</a></li>
              <li><a href="#">Tours</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div className="footer-col">
            <h4>Contact</h4>
            <p><EnvironmentOutlined /> 123 Nguyễn Huệ, Quận 1, TP.HCM</p>
            <p><PhoneOutlined /> +84 123 456 789</p>
            <p><MailOutlined /> support@travelvn.com</p>
          </div>

          {/* 4. Social */}
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#"><FacebookFilled /></a>
              <a href="#"><TwitterSquareFilled /></a>
              <a href="#"><InstagramFilled /></a>
              <a href="#"><YoutubeFilled /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
                   PhathociT Design ©{new Date().getFullYear()} Created by Ant UED
        </div>
      </Container>
    </footer>
  );
};
