package org.ottodono.dofusalmanax.scrapper.application.rest.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ottodono.dofusalmanax.scrapper.application.rest.dto.AlmanaxDto;
import org.ottodono.dofusalmanax.scrapper.core.entities.Almanax;
import org.ottodono.dofusalmanax.scrapper.core.services.ScrapperAlmanaxService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/v1/dofus/almanax")
@RequiredArgsConstructor
public class DofusAlmanaxController {

    private final ScrapperAlmanaxService service;

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<AlmanaxDto>> fetchAlmanaxs(@RequestParam(name = "date", required = false) final String date) {
        final List<Almanax> almanaxs = service.scrapper(Instant.now());

        if (almanaxs.isEmpty())
            return ResponseEntity.noContent().build();

        final List<AlmanaxDto> almanaxsDto = almanaxs.stream().map(almanax ->
                new AlmanaxDto(
                        almanax.date().toString(),
                        almanax.type(),
                        almanax.bonus(),
                        almanax.offer(),
                        almanax.image()
                )
        ).toList();
        return ResponseEntity.ok(almanaxsDto);
    }

}
