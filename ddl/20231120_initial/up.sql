CREATE TABLE plot (
    id          NUMBER GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT by 1),
    description VARCHAR2(255),
    PRIMARY KEY (id)
);

CREATE TABLE sowing (
    id          NUMBER GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT by 1),
    action_date DATE NOT NULL,
    plant       VARCHAR2(255) NOT NULL,
    depth_mm    NUMBER NOT NULL,
    density     NUMBER NOT NULL,
    PRIMARY KEY (id),
    plot_id     CONSTRAINT fk_sowing_plot
                REFERENCES plot(id)
);

CREATE INDEX idx_sowing_plant ON sowing(plant);
CREATE INDEX idx_sowing_plot_id ON sowing(plot_id);

CREATE TABLE treatment (
    id          NUMBER GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT by 1),
    treatment   VARCHAR2(255) NOT NULL,
    PRIMARY KEY (id),
    sowing_id   CONSTRAINT fk_treatment_sowing
                REFERENCES sowing(id)
);

CREATE INDEX idx_treatment_sowing_id ON treatment(sowing_id);

CREATE TABLE oper_mgmt (
    id              NUMBER GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT by 1),
    action_date     DATE NOT NULL,
    stage           VARCHAR2(255) NOT NULL,
    product         VARCHAR2(255) NOT NULL,
    amount          NUMBER NOT NULL,
    amount_unit     VARCHAR2(255) NOT NULL,
    product_type    VARCHAR2(255) NOT NULL,
    PRIMARY KEY (id),
    plot_id     CONSTRAINT fk_oper_mgmt_plot
                REFERENCES plot(id)
);

CREATE INDEX idx_oper_mgmt_product ON oper_mgmt(product);
CREATE INDEX idx_oper_mgmt_product_type ON oper_mgmt(product_type);
CREATE INDEX idx_oper_mgmt_plot_id ON oper_mgmt(plot_id);
