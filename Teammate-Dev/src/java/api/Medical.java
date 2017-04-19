package api;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "medical")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Medical.findAll", query = "SELECT m FROM Medical m")
    , @NamedQuery(name = "Medical.findByMId", query = "SELECT m FROM Medical m WHERE m.mId = :mId")
    , @NamedQuery(name = "Medical.findByContent", query = "SELECT m FROM Medical m WHERE m.content = :content")
    , @NamedQuery(name = "Medical.findByDescription", query = "SELECT m FROM Medical m WHERE m.description = :description")
})
public class Medical implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "m_id")
    private Integer mId;
    @Size(max = 75)
    @Column(name = "content")
    private String content;
    @Size(max = 255)
    @Column(name = "description")
    private String description;
    @JoinColumn(name = "img_id", referencedColumnName = "img_id")
    @ManyToOne(optional = false)
    private Image imgId;

    public Medical(){}

    public Medical(Integer mId){
      this.mId = mId;
    }

    public Integer getMId(){
      return mId;
    }

    public void setMId(Integer mId){
      this.mId = mId;
    }

    public String getContent(){
      return content;
    }

    public void setContent(String content){
      this.content = content;
    }

    public String getDescription(){
      return description;
    }

    public void setDescription(String description){
      this.description = description;
    }

    public Image getImgId(){
      return imgId;
    }

    public void setImgId(Image imgId) {
        this.imgId = imgId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (mId != null ? mId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Medical)) {
            return false;
        }
        Medical other = (Medical) object;
        if ((this.mId == null && other.mId != null) || (this.mId != null && !this.mId.equals(other.mId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "api.Medical[ mId=" + mId + " ]";
    }
}
