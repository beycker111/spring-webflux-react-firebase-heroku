package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

@SpringBootTest
class DeleteAnswerUseCaseTest {

    @SpyBean
    DeleteAnswerUseCase deleteAnswerUseCase;

    @MockBean
    AnswerRepository answerRepository;

    @Test
    @DisplayName("Eliminar pregunta.")
    void deleteTest(){

        var answer = new AnswerDTO("1","2","114405","answer1");

        Mockito.when(answerRepository.deleteById(answer.getId())).thenReturn(Mono.empty());
        var delAnswer = deleteAnswerUseCase
                .apply(answer.getId())
                .thenReturn(Mono.empty());

        Assertions.assertEquals(delAnswer.block(),Mono.empty());
    }
}