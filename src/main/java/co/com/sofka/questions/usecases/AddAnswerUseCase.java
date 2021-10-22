package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

import co.com.sofka.questions.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;

@Service
@Validated
public class AddAnswerUseCase implements SaveAnswer {

    @Autowired
    MailService mailService;

    private final AnswerRepository answerRepository;
    private final MapperUtils mapperUtils;
    private final GetUseCase getUseCase;

    public AddAnswerUseCase(MapperUtils mapperUtils, GetUseCase getUseCase, AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
        this.getUseCase = getUseCase;
        this.mapperUtils = mapperUtils;
    }

    public Mono<QuestionDTO> apply(AnswerDTO answerDTO) {
        Objects.requireNonNull(answerDTO.getQuestionId(), "Id of the answer is required");
        return getUseCase.apply(answerDTO.getQuestionId()).flatMap(question ->
                answerRepository.save(mapperUtils.mapperToAnswer().apply(answerDTO))
                        .map(answer -> {
                            question.getAnswers().add(answerDTO);
                            mailService.sendMail(
                                    question.getUserEmail(),
                                    "Se ha registrado una respuesta a la pregunta " + question.getQuestion(),
                                    answer.getAnswer()
                            );
                            return question;
                        })
        );
    }

}
