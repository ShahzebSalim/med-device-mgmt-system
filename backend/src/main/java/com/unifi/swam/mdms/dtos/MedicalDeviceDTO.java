import javax.json.bind.annotation.JsonbDateFormat;
import javax.json.bind.annotation.JsonbProperty;

public class MedicalDeviceDTO {
    @JsonbProperty("id")
    private Long id;
    @JsonbProperty("name")
    private String name;
    // Additional fields...

    @JsonbDateFormat("yyyy-MM-dd")
    @JsonbProperty("certificationDate")
    private String certificationDate;
    // Getters and Setters
}