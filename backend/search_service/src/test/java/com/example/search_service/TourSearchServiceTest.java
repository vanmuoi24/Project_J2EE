package com.example.search_service;

import com.example.search_service.document.TourDocument;
import com.example.search_service.repository.TourSearchRepository;
import com.example.search_service.service.TourSearchService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TourSearchServiceTest {
    @Mock
    private TourSearchRepository repo;

    @Mock
    private ElasticsearchOperations elasticsearchOperations;

    @Mock
    private RedisTemplate<String, Object> redisTemplate;

    @InjectMocks
    private TourSearchService service;

    @Test
    void testSave_ShouldDeleteAllCacheAndReturnSavedDoc() {
        // given
        TourDocument doc = new TourDocument();
        when(repo.save(doc)).thenReturn(doc);
        when(redisTemplate.keys("filter:*")).thenReturn(Set.of("filter:HN:5to10:2025-10-20"));

        // when
        TourDocument result = service.save(doc);

        // then
        verify(repo).save(doc);
        verify(redisTemplate).delete("allTours");
        verify(redisTemplate).delete(Set.of("filter:HN:5to10:2025-10-20"));
        assertEquals(doc, result);
    }
}
