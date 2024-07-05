-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 03 Jul 2024 pada 02.24
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mopartdb`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `admintokens`
--

CREATE TABLE `admintokens` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `collections`
--

CREATE TABLE `collections` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `contactus`
--

CREATE TABLE `contactus` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `date_form` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `contactus`
--

INSERT INTO `contactus` (`id`, `name`, `email`, `subject`, `message`, `date_form`, `createdAt`, `updatedAt`) VALUES
(1, 'Ferrry', 'ferrypradana228@gmail.com', NULL, 'Menurutku keren bang', '2024-07-02 23:42:15', '2024-07-02 23:42:15', '2024-07-02 23:42:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `countrys`
--

CREATE TABLE `countrys` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `countrys`
--

INSERT INTO `countrys` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Indonesia', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Malaysia', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Amerika', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Inggris', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Jepang', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `developers`
--

CREATE TABLE `developers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `followers`
--

CREATE TABLE `followers` (
  `id` int(11) NOT NULL,
  `following_user_id` int(11) NOT NULL,
  `followed_user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `followers`
--

INSERT INTO `followers` (`id`, `following_user_id`, `followed_user_id`, `createdAt`, `updatedAt`) VALUES
(3, 3, 1, '2024-07-02 11:08:53', '2024-07-02 11:08:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `image_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('active','pending','deleted') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `images`
--

INSERT INTO `images` (`id`, `user_id`, `image_name`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Malam Berbintang', '**Malam Berbintang** adalah salah satu karya paling terkenal dari pelukis post-impresionis Belanda, Vincent van Gogh. Dilukis pada tahun 1889, karya ini menggambarkan pemandangan malam yang berputar dan bergerak dengan cara yang hampir magis. Dengan ukuran sekitar 73.7 cm x 92.1 cm, lukisan ini sekarang berada di Museum of Modern Art di New York City.\n\nDalam karya ini, langit malam mendominasi kanvas dengan pusaran besar, awan berputar, dan bintang yang bersinar terang dengan lingkaran cahaya yang hampir supernatural. Di latar belakang, bulan sabit kuning bersinar terang di antara bintang-bintang, menciptakan kontras yang dramatis dengan langit biru gelap. Di bawah langit yang bergejolak, terdapat sebuah desa kecil dengan atap rumah dan menara gereja yang menjulang tinggi, memberikan sentuhan tenang dan stabil di tengah kekacauan langit di atasnya.\n\nDi sebelah kiri lukisan, pohon cemara yang tinggi dan gelap berdiri seperti penjaga yang menjulang, menambah kesan mendalam pada komposisi. Van Gogh menggunakan sapuan kuas yang tebal dan ekspresif, yang menciptakan tekstur dan gerakan yang dinamis di seluruh permukaan kanvas. Dengan perpaduan warna yang kontras dan teknik melukis yang unik, **Malam Berbintang** tidak hanya menangkap keindahan alam semesta, tetapi juga mencerminkan kondisi emosional dan mental van Gogh pada saat itu, menjadikan karya ini sebagai salah satu representasi paling ikonik dari ekspresi artistik dan spiritual.', NULL, '2024-07-02 07:02:32', '2024-07-02 07:02:32'),
(2, 1, 'Cloud Day ,1878', 'Cloudy Day atau Cloudy Day, 1878 adalah lukisan karya pelukis Rusia, Isaac Levitan, yang terkenal karena karya-karya lanskapnya yang menggambarkan keindahan alam Rusia dengan cara yang sangat emosional dan puitis. Dilukis pada tahun 1878, karya ini menampilkan keahlian Levitan dalam menangkap suasana dan suasana hati melalui pemandangan alam.\nLangit mendominasi sebagian besar kanvas dengan awan tebal yang menggulung dan memberikan nuansa suram dan melankolis. Warna-warna abu-abu dan biru mendominasi langit, menciptakan kontras yang dramatis dengan lanskap di bawahnya.\n\nDi latar depan, terdapat padang rumput yang luas dengan rumput yang tumbuh subur, menggambarkan kesuburan alam. Beberapa pohon berdiri dengan kokoh di sepanjang horizon, menambah kedalaman dan perspektif pada komposisi. Warna-warna hijau dan cokelat dari tanah dan vegetasi memberikan kehangatan yang kontras dengan dinginnya warna langit.\n\nDi kejauhan, garis horizon hampir tak terlihat, memudar ke dalam kabut yang lembut, memberikan kesan luasnya alam dan perasaan kesendirian yang mendalam. Levitan menggunakan sapuan kuas yang lembut dan teknik yang halus untuk menciptakan tekstur dan detail yang realistis, tetapi tetap mempertahankan sentuhan impresionistik yang menangkap suasana dan perasaan pemandangan tersebut.', NULL, '2024-07-02 15:21:15', '2024-07-02 15:21:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `liked_by_user_id` int(11) NOT NULL,
  `liked_user_id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `message_room_id` int(11) NOT NULL,
  `sender_user_id` int(11) NOT NULL,
  `receiver_user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `messages`
--

INSERT INTO `messages` (`id`, `message_room_id`, `sender_user_id`, `receiver_user_id`, `message`, `timestamp`, `createdAt`, `updatedAt`) VALUES
(1, 1, 3, 1, 'hallo bang', '2024-07-02 11:09:13', '2024-07-02 11:09:13', '2024-07-02 11:09:13'),
(2, 1, 1, 3, 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', '2024-07-02 13:04:07', '2024-07-02 13:04:07', '2024-07-02 13:04:07'),
(3, 1, 1, 3, 'daw', '2024-07-02 13:07:15', '2024-07-02 13:07:15', '2024-07-02 13:07:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `timestamp`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'WELCOME TO MUSIUM OF ART', 'user was created successfully', '2024-07-02 06:58:46', '2024-07-02 06:58:46', '2024-07-02 06:58:46'),
(2, 3, 'WELCOME TO MUSIUM OF ART', 'user was created successfully', '2024-07-02 07:23:36', '2024-07-02 07:23:36', '2024-07-02 07:23:36'),
(3, 1, 'you have new message', 'you have new message', '2024-07-02 11:09:14', '2024-07-02 11:09:13', '2024-07-02 11:09:13'),
(4, 3, 'you have new message', 'you have new message', '2024-07-02 13:04:08', '2024-07-02 13:04:08', '2024-07-02 13:04:08'),
(5, 3, 'you have new message', 'you have new message', '2024-07-02 13:07:15', '2024-07-02 13:07:15', '2024-07-02 13:07:15'),
(6, 3, 'Felix upload new image', 'Felix upload new image', '2024-07-02 15:21:15', '2024-07-02 15:21:15', '2024-07-02 15:21:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo_profile` varchar(255) DEFAULT NULL,
  `professi` varchar(255) DEFAULT NULL,
  `country` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `x` varchar(255) DEFAULT NULL,
  `whatsapp` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `status` enum('aktif','pending','deleted') DEFAULT 'aktif',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `photo_profile`, `professi`, `country`, `created`, `facebook`, `instagram`, `x`, `whatsapp`, `youtube`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Felix', 'Dimas@yahoo.com', '$2b$10$uT9/Hc20CzQlFZq9PRtQFeJ.wnWX6Sgv9KVQoAqekbB3VpId/g0Oa', '1', 'Designer', 3, '2024-07-02 06:58:46', 'felix', 'felix', NULL, NULL, 'felix', 'aktif', '2024-07-02 06:58:46', '2024-07-03 00:06:15'),
(3, 'FelixKun', 'ferrypradana228@gmail.com', '$2b$10$dKM2E3UA6xvfzOC7TQAMs.ZjkrTRSSsXUM.7kFtuUGxd44Ct1EkU6', NULL, NULL, NULL, '2024-07-02 07:23:36', NULL, NULL, NULL, NULL, NULL, 'aktif', '2024-07-02 07:23:36', '2024-07-02 10:49:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `usertokens`
--

CREATE TABLE `usertokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `usertokens`
--

INSERT INTO `usertokens` (`id`, `user_id`, `token`, `createdAt`, `updatedAt`) VALUES
(14, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJGZWxpeEt1biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE5OTYzNTExLCJleHAiOjE3MjA4Mjc1MTF9.WDQvuZDkzFJIOhvLSdZD0xyPPs5K9SsxYXUz7Lhm-ko', '2024-07-02 23:38:31', '2024-07-02 23:38:31'),
(15, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJGZWxpeCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE5OTY1MDQ5LCJleHAiOjE3MjA4MjkwNDl9.dw4EgMiMQgS76mOHuVX5O7d56E-2ff4Jzrvt2djRhLw', '2024-07-03 00:04:09', '2024-07-03 00:04:09');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indeks untuk tabel `admintokens`
--
ALTER TABLE `admintokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indeks untuk tabel `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_user_id` (`user_id`),
  ADD KEY `index_image_id` (`image_id`);

--
-- Indeks untuk tabel `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `countrys`
--
ALTER TABLE `countrys`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `developers`
--
ALTER TABLE `developers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_following_user_id` (`following_user_id`),
  ADD KEY `index_followed_user_id` (`followed_user_id`),
  ADD KEY `index_followed_user_id_and_following_user_id` (`followed_user_id`,`following_user_id`);

--
-- Indeks untuk tabel `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_user_id_and_image_name` (`user_id`,`image_name`),
  ADD KEY `index_status_user` (`status`);

--
-- Indeks untuk tabel `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_user_id_like` (`liked_by_user_id`),
  ADD KEY `index_user_id_liked` (`liked_user_id`);

--
-- Indeks untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_user_id` (`sender_user_id`),
  ADD KEY `receiver_user_id` (`receiver_user_id`),
  ADD KEY `index_message_id` (`id`,`message_room_id`),
  ADD KEY `index_receiver_user_id` (`message_room_id`,`receiver_user_id`);

--
-- Indeks untuk tabel `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `index_id_and_user_id` (`id`,`user_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `country` (`country`),
  ADD KEY `index_username` (`username`),
  ADD KEY `index_email_user` (`email`);

--
-- Indeks untuk tabel `usertokens`
--
ALTER TABLE `usertokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `index_token` (`token`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `admintokens`
--
ALTER TABLE `admintokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `contactus`
--
ALTER TABLE `contactus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `countrys`
--
ALTER TABLE `countrys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `developers`
--
ALTER TABLE `developers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `usertokens`
--
ALTER TABLE `usertokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `admintokens`
--
ALTER TABLE `admintokens`
  ADD CONSTRAINT `admintokens_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`);

--
-- Ketidakleluasaan untuk tabel `collections`
--
ALTER TABLE `collections`
  ADD CONSTRAINT `collections_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `collections_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`);

--
-- Ketidakleluasaan untuk tabel `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`following_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`followed_user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`liked_by_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`liked_user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`country`) REFERENCES `countrys` (`id`);

--
-- Ketidakleluasaan untuk tabel `usertokens`
--
ALTER TABLE `usertokens`
  ADD CONSTRAINT `usertokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
