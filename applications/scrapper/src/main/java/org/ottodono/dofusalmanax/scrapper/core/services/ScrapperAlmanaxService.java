package org.ottodono.dofusalmanax.scrapper.core.services;

import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;
import org.ottodono.dofusalmanax.scrapper.core.entities.Almanax;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
public class ScrapperAlmanaxService {

    public List<Almanax> scrapper(final Instant date) {
        final String url = "https://www.krosmoz.com/fr/almanax";
        try {
            final Document document = Jsoup.connect(url).get();
            final Elements achivementDofus = document.select("#achievement_dofus");
            final Elements mid = achivementDofus.select(".mid");
            log.info("Mid info: {}", mid);

            String type = null;
            String bonus = null;
            String offer = null;
            String image = null;
            if (mid.first() != null) {
                final Node node = Objects.requireNonNull(Objects.requireNonNull(Objects.requireNonNull(mid.first()).firstChild()).nextSibling()).nextSibling();
                type = Objects.requireNonNull(node).toString().split(":")[1].trim();

                final Element more = Objects.requireNonNull(mid.select(".more").first());
                bonus = more.text().split("\\.")[0].trim();

                final Element moreInfosContent = mid.select(".more-infos-content").first();
                offer = Objects.requireNonNull(moreInfosContent).select("p").text()
                        .replace("Offrande à Totot Récupérer", "")
                        .replace("et rapporter l'offrande à Théodoran Ax", "")
                        .trim();
                image = Objects.requireNonNull(moreInfosContent).select("img").attr("src");
            }
            return Collections.singletonList(new Almanax(date, type, bonus, offer, image));
        } catch (final IOException exception) {
            throw new RuntimeException(exception);
        }
    }

}
