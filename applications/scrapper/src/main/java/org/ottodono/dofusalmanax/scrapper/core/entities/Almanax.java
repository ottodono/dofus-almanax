package org.ottodono.dofusalmanax.scrapper.core.entities;

import java.time.Instant;

public record Almanax(Instant date,
                      String type,
                      String bonus,
                      String offer,
                      String image) {
}
