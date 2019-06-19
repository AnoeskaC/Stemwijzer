SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `stemwijzer`
--
CREATE DATABASE IF NOT EXISTS `stemwijzer_database` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `stemwijzer_database`;

--
-- Tabelstructuur voor tabel `stemwijzer`
--

DROP TABLE IF EXISTS `parties`;
CREATE TABLE `parties` (
  `parties_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `parties`
--

INSERT INTO `parties` (`parties_id`) VALUES
(1);
